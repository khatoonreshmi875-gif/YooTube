import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-700">
      <h1 className="text-2xl mb-6 font-bold">Welcome to VideoHub</h1>
      <div className="space-x-4">
        
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-100  shadow-md shadow-blue-200 rounded hover:bg-blue-700 active:shadow-black text-bl"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 shadow-blue-200 shadow-md active:shadow-black"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
