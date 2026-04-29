import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  // Fetch user info whenever we have a token
  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    async function fetchUser() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) throw new Error()
        const data = await res.json()
        setUser(data)
      } catch {
        // Token is invalid or expired — log out cleanly
        logout()
      }
    }

    fetchUser()
  }, [token])

  function login(newToken) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
