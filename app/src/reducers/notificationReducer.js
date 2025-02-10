import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    clearNotification: () => {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithDelay = (message, delay, type) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, delay * 1000)
  }
}

export default notificationSlice.reducer
