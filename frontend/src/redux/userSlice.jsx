import { createSlice } from '@reduxjs/toolkit'
import OtherUsers from '../components/OtherUsers';

const userSlice=createSlice({
    name:'user',
    initialState:{
        authUser:null,
        OtherUsers:null,
        selectedUser:null,
        onlineUsers:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.OtherUsers=action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        }
    }


})

export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers}=userSlice.actions
export default userSlice.reducer