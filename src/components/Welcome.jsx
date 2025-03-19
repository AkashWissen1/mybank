import React from 'react'

function Welcome({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>You’re now logged in. Below is your banking dashboard.</p>
    </div>
  )
}

export default Welcome
