import React from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const notification = props.notification

  if (notification.content) {
    props.removeNotification(5)
  }

  return (
    <div style={notification.style}>
      {notification.content}
    </div>
  )
}

const mapDispatchToProps = {
  removeNotification,
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
export default ConnectedNotification