import React, { useState } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import {useDispatch, useDispath} from 'react-redux'
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
const [user,setUser]=useState({
    username:"",
    password:""
})
const navigate=useNavigate()
const dispatch=useDispatch()

const SubmitHandler=async(e)=>{
    e.preventDefault();
    console.log(user)
    setUser({
        username:"",
        password:""
    })


    try {

        const res = await axios.post(
            "http://localhost:4000/api/v1/user/login",
            user,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if(res.data.success){
            dispatch(setAuthUser(res.data))
            console.log(res.data)
            toast.success("Login Successful")
            navigate('/')
          }
        
    } catch (error) {
        
    }
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
