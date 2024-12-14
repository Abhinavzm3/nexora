import { createSlice } from '@reduxjs/toolkit'
import OtherUsers from '../components/OtherUsers';

const userSlice=createSlice({
    name:'user',
    initialState:{
        authUser:null,
        OtherUsers:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.OtherUsers=action.payload
        }
    }


})

export const {setAuthUser,setOtherUsers}=userSlice.actions
export default userSlice.reducer