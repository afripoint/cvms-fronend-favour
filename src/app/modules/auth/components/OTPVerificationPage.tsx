"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../core/store"
import { resendOtp, verifyOtp } from "../redux/slices/authSlice"
import { setCurrentStep } from "../redux/slices/uiSlice"

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">("email")
  const [countdown, setCountdown] = useState(60)
  const [resendDisabled, setResendDisabled] = useState(true)
  const [/* verified */ /* setVerified */ ,] = useState(false)

  // Set up refs for each input field
  const inputRefs = Array(6)
    .fill(0)
    .map(() => React.createRef<HTMLInputElement>())

  useEffect(() => {
    // Get email, phone number, and delivery method from localStorage
    const storedEmail = localStorage.getItem("userEmail")
    const storedPhoneNumber = localStorage.getItem("userPhoneNumber")
    const storedDeliveryMethod = localStorage.getItem("otpDeliveryMethod") as "email" | "sms"

    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      // Redirect to signup if email is not found
      dispatch(setCurrentStep(2)) // Update the current step in UI state
      navigate("/signup")
    }

    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber)
    }

    if (storedDeliveryMethod) {
      setDeliveryMethod(storedDeliveryMethod)
    }

    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Focus on the first input field
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus()
    }

    return () => clearInterval(timer)
  }, [navigate, dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow one digit
    if (value.length > 1) return

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input field if a digit was entered
    if (value && index < 5 && inputRefs[index + 1]?.current) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input field on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs[index - 1]?.current) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleResendOtp = async () => {
    if (email) {
      try {
        // Make sure phoneNumber is available for the API call
        if (deliveryMethod === "sms" && !phoneNumber) {
          console.error("Phone number required for SMS delivery")
          return
        }

        await dispatch(resendOtp({ email, deliveryMethod }))

        // Reset countdown
        setCountdown(60)
        setResendDisabled(true)

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setResendDisabled(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } catch (err) {
        console.error("Failed to resend OTP:", err)
      }
    }
  }

  // const handleVerify = async () => {
  //   const otpValue = otp.join("")

  //   // More thorough validation
  //   if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
  //     console.error("Incomplete OTP entered")
  //     return // Don't submit if OTP is incomplete
  //   }

  //   try {
  //     const resultAction = await dispatch(
  //       verifyOtp({
  //         email,
  //         otp: otpValue,
  //         phone_number: phoneNumber,
  //       }),
  //     )

  //     // Check if the action was fulfilled
  //     if (verifyOtp.fulfilled.match(resultAction)) {
  //       // The API call was successful and account should be activated

  //       // Clear data from localStorage
  //       localStorage.removeItem("otpDeliveryMethod")
  //       localStorage.removeItem("userPhoneNumber")

  //       // Redirect to dashboard
  //       navigate("/login")
  //     }
  //   } catch (err) {
  //     console.error("OTP verification failed:", err)
  //   }
  // }

  // const handleVerify = async () => {
  //   const otpValue = otp.join("")
  
  //   if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
  //     console.error("Incomplete OTP entered")
  //     return
  //   }
  
  //   try {
  //     const resultAction = await dispatch(
  //       verifyOtp({
  //         email,
  //         otp: otpValue,
  //         phone_number: phoneNumber,
  //       }),
  //     )
  
  //     if (verifyOtp.fulfilled.match(resultAction)) {
  //       // Check if the user is actually activated
  //       const userData = resultAction.payload.user
        
  //       if (userData && userData.is_active) {
  //         // Clear localStorage items
  //         localStorage.removeItem("otpDeliveryMethod")
  //         localStorage.removeItem("userPhoneNumber")
          
  //         // If authentication was successful and user is active
  //         // Navigate directly to dashboard instead of login
  //         navigate("/login")
  //       } else {
  //         console.error("Account activation failed - user still inactive")
  //         // Handle the case where user is still inactive
  //         // You might want to show an error or provide guidance
  //       }
  //     }
  //   } catch (err) {
  //     console.error("OTP verification failed:", err)
  //   }
  // }


  const handleVerify = async () => {
    const otpValue = otp.join("")
  
    // More thorough validation
    if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
      console.error("Incomplete OTP entered")
      return // Don't submit if OTP is incomplete
    }
  
    try {
      const resultAction = await dispatch(
        verifyOtp({
          email,
          otp: otpValue,
          phone_number: phoneNumber,
        }),
      )
  
      // Check if the action was fulfilled
      if (verifyOtp.fulfilled.match(resultAction)) {
        // The API call was successful
        
        // Check if user is active from the response
        const userData = resultAction.payload.user
        
        // Clear data from localStorage
        localStorage.removeItem("otpDeliveryMethod")
        localStorage.removeItem("userPhoneNumber")
  
        if (userData && userData.is_active) {
          // If user is active, redirect to login
          console.log("Account successfully activated, redirecting to login")
          navigate("/login")
        } else {
          // Handle case where API call succeeded but user might still be inactive
          console.error("Verification completed but user account may still be inactive")
          // You might want to show an error message to the user here
        }
      }
    } catch (err) {
      console.error("OTP verification failed:", err)
      // Show error to user
    }
  }

  const handleGoBack = () => {
    dispatch(setCurrentStep(2)) // Update the current step in UI state
    navigate("/signup")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" className="h-8" />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center mb-1">Verify Your Account</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          {deliveryMethod === "email"
            ? `We've sent a 6-digit code to your email ${email.replace(/(.{2})(.*)@(.*)/, "$1***@$3")}`
            : `We've sent a 6-digit code to your phone number`}
        </p>

        <div className="mb-6">
          {/* Hidden phone number field */}
          <input type="hidden" name="phone_number" value={phoneNumber} />

          <div className="flex justify-between gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border rounded-md text-xl font-semibold"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {/* {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>} */}

          <button
            type="button"
            className="w-full py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition mb-4"
            onClick={handleVerify}
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-500">Didn't receive code? </span>
            <button
              type="button"
              className={`text-green-500 hover:underline ${resendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={resendDisabled}
              onClick={handleResendOtp}
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoBack}
          className="w-full py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition"
        >
          Go back
        </button>
      </div>
    </div>
  )
}

export default OTPVerificationPage

