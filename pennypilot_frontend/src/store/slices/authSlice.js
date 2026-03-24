import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name:'auth',
  initialState:{
    token: null,
    user : null,
},
reducers:{
  setCredentials: (state, action) =>{
    state.token = action.payload.token
    state.user = jwtDecode(action.payload.token)
  },
  logout: (state) =>{
    state.token = null
    state.user = null
  }
}
})


export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer