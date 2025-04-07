// import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import { type PasswordResetState, PasswordResetStep } from "../../types/auth"

// const initialState: PasswordResetState = {
//   currentStep: PasswordResetStep.REQUEST,
//   email: "",
//   token: null,
//   isLoading: false,
//   error: null,
// }

// const passwordResetSlice = createSlice({
//   name: "passwordReset",
//   initialState,
//   reducers: {
//     setEmail: (state, action: PayloadAction<string>) => {
//       state.email = action.payload
//     },
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload
//     },
//     setStep: (state, action: PayloadAction<PasswordResetStep>) => {
//       state.currentStep = action.payload
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload
//     },
//     resetState: (state) => {
//       return initialState
//     },
//   },
// })

// export const { setEmail, setToken, setStep, setLoading, setError, resetState } = passwordResetSlice.actions

// export default passwordResetSlice.reducer






import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type PasswordResetState, PasswordResetStep } from "../../types/auth"

const initialState: PasswordResetState = {
  currentStep: PasswordResetStep.REQUEST,
  email: "",
  token: null,
  isLoading: false,
  error: null,
}

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setStep: (state, action: PayloadAction<PasswordResetStep>) => {
      state.currentStep = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetState: () => {
      return initialState
    },
  },
})

export const { setEmail, setToken, setStep, setLoading, setError, resetState } = passwordResetSlice.actions

export default passwordResetSlice.reducer

