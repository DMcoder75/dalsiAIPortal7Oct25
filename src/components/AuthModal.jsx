import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { hashPassword, verifyPassword, createSession } from '../lib/auth'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/DalSiAILogo2.png'

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  if (!isOpen) return null

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccessMessage('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Get user from database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email)
        .single()

      if (userError || !userData) {
        throw new Error('Invalid email or password')
      }

      // Check if email is verified
      if (!userData.email_verified) {
        throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
      }

      // Check account status
      if (userData.status === 'suspended') {
        throw new Error('Your account has been suspended. Please contact support.')
      }

      if (userData.status === 'deleted') {
        throw new Error('This account no longer exists.')
      }

      // Verify password
      const isPasswordValid = await verifyPassword(formData.password, userData.password_hash)
      
      if (!isPasswordValid) {
        throw new Error('Invalid email or password')
      }

      // Create session
      await createSession(userData.id)

      // Update last login
      await supabase.from('users').update({
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }).eq('id', userData.id)

      // Update auth context
      login(userData)
      
      // Refresh page immediately
      window.location.reload()
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || String(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    let createdUserId = null

    try {
      // Validate password length
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle()

      if (existingUser) {
        throw new Error('An account with this email already exists.')
      }

      // Hash password
      const hashedPassword = await hashPassword(formData.password)

      // Create user ONLY in database (NO Supabase Auth)
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          email: formData.email,
          password_hash: hashedPassword,
          first_name: formData.firstName,
          last_name: formData.lastName,
          company_name: formData.companyName,
          email_verified: false,
          status: 'active',
          role: 'user'
        }])
        .select()
        .single()

      if (insertError) {
        console.error('Database insert error:', insertError)
        throw new Error('Failed to create account. Please try again.')
      }

      createdUserId = newUser.id
      console.log('User created successfully:', createdUserId)

      // Create default notification preferences
      try {
        await supabase.from('notification_preferences').insert([{
          user_id: newUser.id
        }])
      } catch (notifError) {
        console.error('Failed to create notification preferences:', notifError)
        // Continue anyway - not critical
      }

      // Call Firebase HTTP function to send custom verification email
      let emailSent = false
      try {
        console.log('Calling Firebase HTTP function to send verification email...')
        
        const response = await fetch('https://us-central1-innate-temple-337717.cloudfunctions.net/sendVerificationEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            userId: newUser.id,
            firstName: formData.firstName,
            verificationUrl: `${window.location.origin}/verify-email?token=${newUser.id}&email=${formData.email}`
          })
        })

        const result = await response.json()
        
        if (response.ok) {
          console.log('Verification email sent successfully:', result)
          emailSent = true
        } else {
          console.error('Email sending failed:', result)
        }

      } catch (emailError) {
        console.error('Error calling Firebase function:', emailError)
      }

      // Show success message regardless of email status
      if (emailSent) {
        setSuccessMessage('Account created successfully! Please check your email to verify your account.')
      } else {
        setSuccessMessage('Account created successfully! Verification email will be sent shortly. Please check your inbox.')
      }
      
      // Clear form
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        companyName: ''
      })
    } catch (error) {
      console.error('Signup error:', error)
      
      // If user was created but something else failed, try to clean up
      if (createdUserId) {
        console.log('Attempting to rollback user creation...')
        try {
          await supabase.from('users').delete().eq('id', createdUserId)
          console.log('User rollback successful')
        } catch (rollbackError) {
          console.error('Failed to rollback user creation:', rollbackError)
        }
      }
      
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            <img src={logo} alt="Dalsi AI" className="h-10 w-10" />
            <div>
              <CardTitle className="text-xl">
                {isLogin ? 'Welcome Back' : 'Join Dalsi AI'}
              </CardTitle>
              <CardDescription>
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="companyName"
                    placeholder="Company Name (Optional)"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1 h-8 w-8 p-0"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                {successMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setSuccessMessage('')
                  setFormData({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    companyName: ''
                  })
                }}
                className="text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </Button>
            </div>

            {!isLogin && (
              <div className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => window.location.href = '/terms-conditions'}
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => window.location.href = '/privacy-policy'}
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
