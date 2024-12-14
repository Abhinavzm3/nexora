import React from "react";
import { IoLogOut, IoSearchSharp } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
const Sidebar = () => {
const navigate=useNavigate()
  const LogOutHandler=async()=>{

    try {
     
      const res=await axios.post( "http://localhost:4000/api/v1/user/logout")
      if(res.data.success){
        toast.success("Logout Successfully!")
    navigate('/login')
      }
      else{
        toast.error("Error in Logout")
      }
      
    } catch (error) {
      console.log(error)
      
    }

  }


  return (
    <div className="h-full border-r border-gray-700 bg-gray-900 p-4 flex flex-col text-gray-300">
      {/* Search Form */}
      <form className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered rounded-md flex-1 px-4 py-2 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
        >
          <IoSearchSharp className="w-6 h-6" />
        </button>
      </form>

      {/* Divider */}
      <div className="divider border-t border-gray-700 my-2"></div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        <OtherUsers />
        
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <button onClick={LogOutHandler} className="btn btn-block bg-red-600 hover:bg-red-700 text-white transition duration-200 flex items-center justify-center gap-2">
          <IoLogOut  className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
