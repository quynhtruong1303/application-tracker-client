import { createContext, useContext, useState } from 'react'

// Create the context object - components read from this via useAuth()
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    // Iniitialize token from localStorage so refresh does not log user out
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Call this after a successful login/register - persists token and triggers re-render
    function login(newToken) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    // Clears token from storage and state - redirects handled by App.jsx reacting to token becoming null
    function logout() {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        // Expose token, login, and logout to every component inside the provider 
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook - components call useAuth() instead of importing AuthContext directly
export function useAuth() {
    return useContext(AuthContext)
}