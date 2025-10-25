import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, signupUserAPI } from "./userApi";

//  Login Thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Signup Thunk
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    try {
      return await signupUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

import { getAllTaskAPI } from "./userApi";

//  Get all tasks thunk
export const getAllTasks = createAsyncThunk(
  "user/getAllTasks",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      // const token = state.user.data?.token; // assume backend returns token
      const token = JSON.parse(localStorage.getItem("user")); // token string
      return await getAllTaskAPI(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to fetch tasks" });
    }
  }
);

const userFromStorage = JSON.parse(localStorage.getItem("user"));

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userFromStorage || null,
    loading: false,
    error: null,
    todo:null,
    isAuthenticated:false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.todo = null;
      state.isAuthenticated=false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todo=null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // state.todo=action.payload;
        // console.log(action.payload?.data?.token);
        localStorage.setItem("user", JSON.stringify(action.payload?.data?.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
        state.todo=null;
      })

      //  Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload?.data?.token));
        state.isAuthenticated=true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      })
       // ✅ Get All Tasks
    .addCase(getAllTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllTasks.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.todo = action.payload; // tasks store ho jayenge
    })
    .addCase(getAllTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch tasks";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
