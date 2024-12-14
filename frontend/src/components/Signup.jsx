import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    gender: "",
    confirmPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const res=await axios.post('http://localhost:8000/api/v1/user/register',user,{
        headers: {
            "Content-Type": "application/json",
          }
        ,withCredentials:true
    })

    if(res.data){
        toast.success(res.data.message)

    }
    else{
        toast.error("failed to signup")
    }
    // setUser({
    //     fullname: "",
    //     username: "",
    //     password: "",
    //     gender: "",
    //     confirmPassword: "",
    //   })

    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
        <p className="text-center text-gray-600 mb-4">
          Create your account and explore Nexora!
        </p>

        <form onSubmit={submitHandler}>
          {/* Full Name */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  fullname: e.target.value,
                }))
              }
              type="text"
              placeholder="John Doe"
              className="input input-bordered"
            />
          </div>

          {/* Username */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }
              type="text"
              placeholder="abhinavzx"
              className="input input-bordered"
            />
          </div>

          {/* Password */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  confirmPassword: e.target.value,
                }))
              }
              type="password"
              placeholder="Re-enter your password"
              className="input input-bordered"
            />
          </div>
          {/* Gender */}
          <div className="form-control mb-4 flex-row gap-4 text-center justify-center content-center">
            Male:
            <input
              value={"male"}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              type="radio"
              name="gender"
              className="radio radio-primary"
            />
            Female:{" "}
            <input
              value={"female"}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              name="gender"
              type="radio"
              className="radio radio-primary"

            />
          </div>
          

          {/* Submit Button */}
          <div className="form-control">
            <button className="btn btn-primary w-full" type="submit">
              Sign Up
            </button>
          </div>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
