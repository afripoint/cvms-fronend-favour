"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
// import { loginUser } from "../../../redux/slices/authSlice"
import type { AppDispatch } from "../../../core/store"
import { LoginFormData, LoginResponse, User } from "../types/auth"
import { loginUser } from "../redux/slices/authSlice"
// import type { LoginFormData, LoginResponse, User } from "../../../types/auth"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = (await dispatch(loginUser(formData)).unwrap()) as LoginResponse

      // Store tokens in localStorage
      localStorage.setItem("access_token", response.tokens.access_token)
      localStorage.setItem("refresh_token", response.tokens.refresh_token)

      // Store token expiration time (assuming JWT with 1 hour validity)
      const expiresAt = new Date().getTime() + 60 * 60 * 1000 // 1 hour from now
      localStorage.setItem("expires_at", expiresAt.toString())

      // Store user info with email
      const userData: User = {
        ...response.user,
        email: formData.email, // Add email to user data
      }
      localStorage.setItem("user", JSON.stringify(userData))

      // Store CSRF state for protection
      const csrfToken = Math.random().toString(36).substring(2)
      localStorage.setItem("csrf_token", csrfToken)

      // Redirect to landing page
      navigate("/landing", {
        state: {
          ninVerified: response.user["NIN Verified"],
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          email: formData.email,
        },
      })
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleSignUp = () => {
    navigate("/account-type")
  }

  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Welcome back!</h2>
        <p className="text-gray-500 text-center mb-6">Enter your details to access your account</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="hello@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <button type="button" onClick={handleForgotPassword} className="text-sm text-red-500 hover:underline">
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don't have an account? </span>
          <button onClick={handleSignUp} className="text-green-600 hover:underline">
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

