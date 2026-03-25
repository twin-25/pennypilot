import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name:'auth',
  initialState:{
    token: localStorage.getItem('token') || null,
    refresh: localStorage.getItem('refresh') || null,
    user : localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')):null,
},
reducers:{
  setCredentials: (state, action) =>{
    state.token = action.payload.token
    state.refresh = action.payload.refresh
    state.user = jwtDecode(action.payload.token)
    localStorage.setItem('token', action.payload.token)
    localStorage.setItem('refresh', action.payload.refresh)

  },
  logout: (state) =>{
    state.token = null
    state.user = null
    state.refresh = null
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
  }
}
})


export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer