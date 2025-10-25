import React from 'react';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import TodoDetail from './pages/TodoDetail';
import ProtectedRoute from './components/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';



const App = () => {
  return (
    <div>
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/tod-details' element={<TodoDetail/>}/>
      <Route path="/" element={  <ProtectedRoute><Home /></ProtectedRoute>} /> {/* after login */}
    </Routes> 
    <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
