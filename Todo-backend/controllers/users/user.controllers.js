import User from "../../models/User.Models/User.models.js";
import bcrypt from "bcryptjs";
import genrateToken from "../../utils/genrateToken.js";
import asyncHandler from "express-async-handler";
import Todo from "../../models/Todo.Models/Todo.models.js";
import { sendOTPEmail } from "../../config/otpMail.js";

//@desc   Register new user
//@route  POST /api/v1/users/signup
//@access Public

//!signup controller here
export const signup = asyncHandler(async (req, res, next) => {
  const { email, username, password, phone, profilePicture } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({
      status: "Failed",
      message: "User already exists",
    });
  }

  //  Create new user
  const newUser = new User({
    username,
    email,
    password,
    phone,
    profilePicture,
  });

  //hash password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();

  // Response
  res.status(201).json({
    status: "Success",
    message: "User signup successfully",
    data: {
      _id: newUser?._id,
      username: newUser?.username,
      email: newUser?.email,
      profilePicture: newUser?.profilePicture,
      token: genrateToken(newUser),
    },
  });
});

//@desc   Login user
//@route  POST /api/v1/users/login
//@access Public

export const login = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check user exists
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(400).json({
      status: "Failed",
      message: "User Not Found",
    });
  }

  // Compare password
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid credentials",
    });
  }

  // Update last login time
  user.lastlogin = new Date();
  await user.save();

  // Send response (password removed)
  res.status(200).json({
    status: "Success",
    message: "User login successfully",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      token: genrateToken(user),
    },
  });
});

//@desc   profile viwe
//@route  GET /api/v1/users/profile
//@access privet

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.userAuth?._id).select("-password");

  if (!user) {
    return res.status(404).json({
      status: "Failed",
      message: "User not found",
    });
  }

  res.json({
    status: "Success",
    message: "User profile fetched successfully",
    data: user, // bas yahi bhejna hai
  });
});

//@desc   logout
//@route  GET /api/v1/users/logout
//@access privet

// export const logout= asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req?.userAuth?._id).select("-password");

//   if (!user) {
//     return res.status(404).json({
//       status: "Failed",
//       message: "User not found",
//     });
//   }

//   res.json({
//     status: "Success",
//     message: "User profile fetched successfully",
//     data: user, // bas yahi bhejna hai
//   });
// });

//@desc   see all task
//@route  GET /api/v1/users/get-all-tasks
//@access privet

export const getAllTasks = asyncHandler(async (req, res, next) => {
  const user = req.userAuth;
  const userId = user?._id;
  const allTasks = await Todo.find({ user: userId }).select("description createdAt isCompleted");

  res.status(201).json({
    status: "Success",
    message: "Task frtched successfully",
    data: allTasks,
    user,
  });
});




//send otp via mail
//@desc   send otp for forgot password
//@route  GET /api/v1/users/forgot-password
//@access privet

//! idhar se kam karna hai..
export const sendOTP = async (req, res) => {
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = generateOTP();

  try {
    await sendOTPEmail(email, otp);
    // OTP ko DB ya in-memory store me save kar sakte ho expiry ke saath
    res.status(200).json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
