import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import authService from "../../services/authService"
import type { AuthState, RegistrationData } from "../../types/auth"

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null,
  is_accredify: null,
  otpResent: false,
  selectedServices: [],
}

// Async thunks for authentication actions
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegistrationData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState }

      // Ensure role is a string (not null)
      const role = userData.role || state.auth.role || "individual account"

      // Ensure the role value is valid without modifying its case
      const validRoles = ["individual account", "agent account/freight forwarders", "company account"]
      if (!validRoles.includes(role)) {
        return rejectWithValue("Invalid role type")
      }

      // Prepare the API payload with the correct format
      const completeUserData: RegistrationData = {
        ...userData,
        // Ensure role is a string
        role: role,
        // Ensure consistent property name and handle null case
        is_accredify: userData.is_accredify !== undefined ? userData.is_accredify : state.auth.is_accredify,
      }

      const response = await authService.register(completeUserData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || error.message || "Registration failed")
    }
  },
)

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, phone_number }: { email: string; otp: string; phone_number?: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOtp(email, otp, phone_number)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "OTP verification failed")
    }
  },
)

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email, deliveryMethod }: { email: string; deliveryMethod: "email" | "sms" }, { rejectWithValue }) => {
    try {
      const response = await authService.resendOtp(email, deliveryMethod)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to resend OTP")
    }
  },
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Login failed")
    }
  },
)

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email: string, { rejectWithValue }) => {
  try {
    const response = await authService.forgotPassword(email)
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || "Failed to send password reset email")
  }
})

export const resetPasswordTokenCheck = createAsyncThunk(
  "auth/resetPasswordTokenCheck",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await authService.resetPasswordTokenCheck(token)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Invalid or expired token")
    }
  },
)

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async ({ token, newPassword }: { token: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await authService.setNewPassword(token, newPassword)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to reset password")
    }
  },
)

export const fetchCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await authService.getCurrentUser()
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || "Failed to fetch user data")
  }
})

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
  return null
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setRole: (
      state,
      action: PayloadAction<"individual account" | "agent account/freight forwarders" | "company account" | null>,
    ) => {
      state.role = action.payload
    },
    setIs_Accredify: (state, action: PayloadAction<boolean | null>) => {
      state.is_accredify = action.payload
    },
    setSelectedServices: (state, action: PayloadAction<string[]>) => {
      state.selectedServices = action.payload
    },
    resetOtpResent: (state) => {
      state.otpResent = false
    },
  },
  extraReducers: (builder) => {
    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.user = action.payload.user || {}
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user || {}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Reset password token check
    builder
      .addCase(resetPasswordTokenCheck.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPasswordTokenCheck.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPasswordTokenCheck.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Set new password
    builder
      .addCase(setNewPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user || {}
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Resend OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.otpResent = false
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.isLoading = false
        state.otpResent = true
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.otpResent = false
      })

    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.user = action.payload || {}
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
      })

    // Logout user
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })
  },
})

export const { clearError, setRole, setIs_Accredify, setSelectedServices, resetOtpResent } = authSlice.actions
export default authSlice.reducer

