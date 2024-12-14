import React from 'react'
import { IoLogOut, IoSearchSharp } from "react-icons/io5";
import OtherUsers from './OtherUsers';
const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form action=''>
        <input type='text' className='input input-bordered rounded-md'
         placeholder='Search...'></input>
<button type='submit' className='btn btn-circle bg-sky-200'>
    <IoSearchSharp className='w-6 h-6 outline-none'></IoSearchSharp>
</button>
      </form>
      <div className='divider px-3'></div>
      <OtherUsers></OtherUsers>
      <div className='mt-2'><button className='btn btn-sm'>
        Logout
      </button>

      </div>
    </div>
  )
}

export default Sidebar
