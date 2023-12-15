import { createSlice } from "@reduxjs/toolkit"
import cookie from 'js-cookie'

const initialState = {

  token: localStorage.getItem('authToken') || null,
  username: localStorage.getItem('username') || null
}


export const UserSlice = createSlice({

  name: 'user',
  initialState: initialState,

  reducers: {

    userLogin: (state, action) => {


      const { authToken, username } = action?.payload
      //setting token 
      localStorage.setItem('authToken', authToken)
      localStorage.setItem('username', username)


      //store to redux
      state.token = authToken
      state.username = username



    },
    userLogout: (state, action) => {

      localStorage.removeItem('authToken')
      localStorage.removeItem('username')
      cookie.remove('userId')

      state.token = null
      state.username = null

    },
    changeUsername: (state, action) => {
      if (action.payload) {
        localStorage.setItem('username', action.payload)
        state.username = action.payload

      }


    }

  },
})


export const { userLogin, userLogout, changeUsername } = UserSlice.actions
export default UserSlice.reducer 