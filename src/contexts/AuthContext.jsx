import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentSession, logout as logoutUser } from '../lib/auth'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const session = await getCurrentSession()
      if (session && session.users) {
        setUser(session.users)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (userData) => {
    setUser(userData)
    // Trigger guest message migration if there are any
    const guestMessages = JSON.parse(localStorage.getItem('guest_messages') || '[]')
    if (guestMessages.length > 0) {
      // Set a flag to trigger migration in ChatInterface
      localStorage.setItem('pending_guest_migration', 'true')
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    checkSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
