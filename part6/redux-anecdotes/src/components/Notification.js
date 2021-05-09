import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  if (notification.content) {
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div style={notification.style}>
      {notification.content}
    </div>
  )
}

export default Notification