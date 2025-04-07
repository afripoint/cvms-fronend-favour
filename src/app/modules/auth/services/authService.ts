import axios from "axios"
import type { RegistrationData, User } from "../types/auth"
import { appSaveToLocalStorage, appGetFromLocalStorage, appRemoveFromLocalStorage, StorageKeys } from "../../../core/storage/storage"

const isDev = process.env.NODE_ENV === 'development'
const API_URL = "/api/auth"

// Create axios instance with improved error handling
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
  withCredentials: true,
})

// Add request interceptor for debugging
authAxios.interceptors.request.use(
  (config) => {
    console.log("Request being sent:", config)

    // Add auth token to header if available
    const token =
      appGetFromLocalStorage<string>("authToken") ||
      appGetFromLocalStorage<{ access_token: string }>(StorageKeys.TOKEN_DATA)?.access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Add response interceptor for debugging
authAxios.interceptors.response.use(
  (response) => {
    console.log("Response received:", response)
    return response
  },
  (error) => {
    console.error("Response error details:", error.response || error.message)
    return Promise.reject(error)
  },
)

const authService = {
  // Register new user with improved error handling
  register: async (userData: RegistrationData): Promise<any> => {
    try {
      console.log("Sending registration data:", userData)
      const response = await authAxios.post("/register/", userData)
      console.log("Registration successful:", response.data)

      // Store user data for later use
      if (response.data.user) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
      }

      return response.data
    } catch (error: any) {
      console.error("Registration error:", error)
      // Provide more detailed error information
      const errorMessage =
        error.response?.data?.detail || error.response?.data?.message || error.message || "Registration failed"
      throw new Error(errorMessage)
    }
  },

  login: async (email: string, password: string): Promise<any> => {
    try {
      console.log("Attempting login for:", email)
      const response = await authAxios.post("/login/", { email, password })

      console.log("Login successful")

      // Save token and user data
      if (response.data.token) {
        appSaveToLocalStorage("authToken", response.data.token)
        authAxios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

        // Store token in predefined storage key
        appSaveToLocalStorage(StorageKeys.TOKEN_DATA, {
          access_token: response.data.token,
          refresh_token: response.data.refresh_token || "",
        })
      }

      // Store user data if available
      if (response.data.user) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
      }

      return response.data
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message)
      throw error
    }
  },

  forgotPassword: async (email: string): Promise<any> => {
    try {
      console.log("Sending password reset request for:", email)
      const response = await authAxios.post("/forget-password-email/", { email })
      console.log("Password reset email sent")
      return response.data
    } catch (error: any) {
      console.error("Password reset request error:", error.response?.data || error.message)
      throw error
    }
  },

  resetPasswordTokenCheck: async (token: string): Promise<any> => {
    try {
      console.log("Validating reset password token")
      const response = await authAxios.post("/reset-password-token-check/", { token })
      console.log("Token validation successful")
      return response.data
    } catch (error: any) {
      console.error("Token validation error:", error.response?.data || error.message)
      throw error
    }
  },

  setNewPassword: async (token: string, newPassword: string): Promise<any> => {
    try {
      console.log("Setting new password with token")
      const response = await authAxios.post("/set-new-password/", { token, new_password: newPassword })
      console.log("Password reset successful")
      return response.data
    } catch (error: any) {
      console.error("Password reset error:", error.response?.data || error.message)
      throw error
    }
  },

  verifyOtp: async (email: string, otp: string, phone_number?: string): Promise<any> => {
    try {
      console.log("Sending OTP verification data:", { email, otp, phone_number })

      // Build payload, only including phone_number if it exists
      const payload: any = { email, otp }
      if (phone_number) {
        payload.phone_number = phone_number
        // Store phone number for future use
        appSaveToLocalStorage("userPhoneNumber", phone_number)
      }

      const response = await authAxios.post("/verify-otp/", payload)

      console.log("OTP verification response:", response.data)

      // Validate response structure
      if (!response.data) {
        throw new Error("Empty response received from server")
      }

      // Save the token to localStorage if it's in the response
      if (response.data.token) {
        appSaveToLocalStorage("authToken", response.data.token)

        // Set the token in authorization header for future requests
        authAxios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        console.log("Auth token saved to localStorage and added to request headers")

        // Store token in predefined storage key
        appSaveToLocalStorage(StorageKeys.TOKEN_DATA, {
          access_token: response.data.token,
          refresh_token: response.data.refresh_token || "",
        })
      } else {
        console.warn("No auth token received in OTP verification response")
      }

      // Store user data if available
      if (response.data.user) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
      }

      return response.data
    } catch (error: any) {
      console.error("OTP verification error:", error.response?.data || error.message)
      throw error
    }
  },

  resendOtp: async (email: string, deliveryMethod: "email" | "sms"): Promise<any> => {
    try {
      console.log("Resending OTP via", deliveryMethod, "to:", email)

      // Get phone number from localStorage if available
      const phoneNumber = appGetFromLocalStorage<string>("userPhoneNumber") || ""

      // Map the delivery method to message_choice
      const messageChoice = deliveryMethod // Both are 'email' or 'sms'

      // Build the payload according to the backend requirements
      const payload = {
        email: email,
        phone_number: phoneNumber,
        message_choice: messageChoice,
      }

      console.log("Sending resend OTP payload:", payload)
      const response = await authAxios.put("/resend-otp/", payload)

      console.log("OTP resent successfully")
      return response.data
    } catch (error: any) {
      console.error("OTP resend error:", error.response?.data || error.message)
      throw error
    }
  },

  logout: async () => {
    try {
      console.log("Logging out user")
      await authAxios.post("/logout/")

      // Remove auth header
      delete authAxios.defaults.headers.common["Authorization"]
      console.log("User logged out successfully")

      // Clear stored user data and tokens
      appRemoveFromLocalStorage("authToken")
      appRemoveFromLocalStorage(StorageKeys.USER_DATA)
      appRemoveFromLocalStorage(StorageKeys.TOKEN_DATA)
      appRemoveFromLocalStorage("userPhoneNumber")
    } catch (error: any) {
      console.error("Logout error:", error.response?.data || error.message)

      // Still remove auth header and clear storage even if API call fails
      delete authAxios.defaults.headers.common["Authorization"]
      appRemoveFromLocalStorage("authToken")
      appRemoveFromLocalStorage(StorageKeys.USER_DATA)
      appRemoveFromLocalStorage(StorageKeys.TOKEN_DATA)
      appRemoveFromLocalStorage("userPhoneNumber")

      throw error
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      // First try to get from storage
      const storedUser = appGetFromLocalStorage<User>(StorageKeys.USER_DATA)

      if (storedUser) {
        console.log("User data retrieved from storage")
        return storedUser
      }

      console.log("Fetching current user data from API")
      const response = await authAxios.get("/user/")
      console.log("User data fetched successfully")

      // Store the fresh user data
      if (response.data) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data)
      }

      return response.data
    } catch (error: any) {
      console.error("Get current user error:", error.response?.data || error.message)
      throw error
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    try {
      console.log("Checking authentication status")
      await authAxios.get("/check-auth/")
      console.log("User is authenticated")
      return true
    } catch (error: any) {
      console.log("User is not authenticated")
      return false
    }
  },
}

export default authService

