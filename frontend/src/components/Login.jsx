import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
const [user,setUser]=useState({
    username:"",
    password:""
})

const SubmitHandler=async(e)=>{
    e.preventDefault();
    console.log(user)
    setUser({
        username:"",
        password:""
    })
}

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Log In</h1>
        <p className="text-center text-gray-600 mb-4">
          Welcome back to Nexora! Please log in.
        </p>

        <form onSubmit={SubmitHandler}>
          {/* username */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              value={user.username}
              placeholder="abhinavzx"
              className="input input-bordered"
              onChange={(e)=>(
                setUser({...user,username:e.target.value

                })
            )}
            />
          </div>

          {/* Password */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
            value={user.password}
            onChange={(e)=>(
                setUser({...user,password:e.target.value

                })
            )}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="label cursor-pointer flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button className="btn btn-primary w-full">Log In</button>
          </div>
        </form>


      

        {/* Redirect to Sign Up */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
