import { supabase } from './supabase'

// Hash password using Web Crypto API (browser-compatible)
export const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// Verify password
export const verifyPassword = async (password, hashedPassword) => {
  const inputHash = await hashPassword(password)
  return inputHash === hashedPassword
}

// Generate session token
export const generateSessionToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Create user session
export const createSession = async (userId) => {
  const sessionToken = generateSessionToken()
  
  const { data, error } = await supabase
    .from('user_sessions')
    .insert([{
      user_id: userId,
      session_token: sessionToken,
      ip_address: '0.0.0.0', // Would be actual IP in production
      user_agent: navigator.userAgent,
      device_info: {
        platform: navigator.platform,
        language: navigator.language
      },
      is_active: true
    }])
    .select()
    .single()

  if (error) throw error
  
  // Store session in localStorage
  localStorage.setItem('session_token', sessionToken)
  localStorage.setItem('user_id', userId)
  
  return data
}

// Get current session
export const getCurrentSession = async () => {
  const sessionToken = localStorage.getItem('session_token')
  const userId = localStorage.getItem('user_id')
  
  if (!sessionToken || !userId) return null
  
  // Check if session exists and is active
  const { data: sessionData, error: sessionError } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('session_token', sessionToken)
    .eq('user_id', userId)
    .eq('is_active', true)
    .single()
  
  if (sessionError || !sessionData) return null
  
  // Fetch user data separately
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (userError || !userData) return null
  
  return {
    ...sessionData,
    users: userData
  }
}

// Logout
export const logout = async () => {
  const sessionToken = localStorage.getItem('session_token')
  
  if (sessionToken) {
    await supabase
      .from('user_sessions')
      .update({ 
        is_active: false,
        logout_time: new Date().toISOString()
      })
      .eq('session_token', sessionToken)
  }
  
  localStorage.removeItem('session_token')
  localStorage.removeItem('user_id')
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('session_token')
}
