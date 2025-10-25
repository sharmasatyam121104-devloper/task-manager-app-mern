import express from "express";
import { getAllTasks, getProfile, login, signup } from "../../controllers/users/user.controllers.js";
import isAuthentication from "../../middlewares/isAuthentication.js";

const usersRouters = express.Router()

//!Signup Route
usersRouters.post('/signup',signup);

//!login route
usersRouters.post('/login',login);

//!get-profile Route
usersRouters.get('/get-profile',isAuthentication,getProfile);

//!see all task
usersRouters.get('/get-all-tasks',isAuthentication,getAllTasks);

export default usersRouters;