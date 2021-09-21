import React from 'react'
import { useSelector } from 'react-redux'
import Notification from '../components/Notification'


const notificationReducer = (state= null,  action) => {
  switch (action.type) {
    case 'NEW_NOTI':
      return action.notification 
    default:
      return state
  }
}
export const newNotification = (notification) => {
  return {
    type: 'NEW_NOTI',
    notification
  }
}

export default notificationReducer