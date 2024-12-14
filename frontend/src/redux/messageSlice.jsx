import { createSlice } from '@reduxjs/toolkit'

const messageSlice=createSlice({
    name:'messages',
    initialState:{
        messages:null,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        }
    }
})