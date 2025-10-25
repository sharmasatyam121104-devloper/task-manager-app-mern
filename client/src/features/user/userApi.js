import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/users", // ✅ Correct backend base URL
});

export const loginUserAPI = async (userData) => {
  const response = await API.post("/login", userData);
  console.log(response);
  return response.data;
};

export const signupUserAPI = async (userData) => {
  const response = await API.post("/signup", userData);
  console.log(response);
  return response.data;
};

// Get All Tasks
export const getAllTaskAPI = async (token) => {
  
  const response = await API.get("/get-all-tasks", {
    headers: {
      Authorization: `Bearer ${token}`, // JWT token from login
    },
  });
  
  return response.data;
};
