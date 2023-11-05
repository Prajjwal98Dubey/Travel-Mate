import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice(
    {
        name:'user',
        initialState:{
            token:'',
            email:''
        },
        reducers:{
            addInfo:(state)=>{
                state.token = JSON.parse(localStorage.getItem("userInfo")).token
            }
        }
    }
)