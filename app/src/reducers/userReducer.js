import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: () => {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const setUserWithDelay = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
    setTimeout(
      () => {
        dispatch(clearUser())
      },
      1000 * 60 * 60 * 24 * 7 // 1 week
    )
  }
}

export default userSlice.reducer
