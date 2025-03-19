import React, { useState } from 'react'

function Login({ onLogin, onRegisterLink }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, })
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Login failed')
      }
      const userData = await res.json()
      onLogin(userData) // triggers setCurrentUser in App
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Don’t have an account?{' '}
        <span
          style={{ color: '#006994', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={onRegisterLink}
        >
          Register here
        </span>
      </p>
    </div>
  )
}

export default Login
