"use client"

import { useState, useEffect } from "react"
import type { User } from "../types"

export  const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<User>({})

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("access_token")
    const expiresAt = localStorage.getItem("expires_at")

    if (accessToken && expiresAt && Number(expiresAt) > new Date().getTime()) {
      setIsLoggedIn(true)

      // Get user data from localStorage
      const userDataStr = localStorage.getItem("user")
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr)
          setUserData(userData)
        } catch (error) {
          console.error("Error parsing user data", error)
        }
      }
    } else {
      setIsLoggedIn(false)
    }
  }

  const signOut = () => {
    // Clear localStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("expires_at")
    localStorage.removeItem("user")
    localStorage.removeItem("csrf_token")

    setIsLoggedIn(false)
    setUserData({})
  }

  return {
    isLoggedIn,
    userData,
    signOut,
    checkLoginStatus,
  }
}

