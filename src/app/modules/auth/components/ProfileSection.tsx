"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ProfileSectionProps } from "../../landing/types"
import { useAuth } from "../hooks"


const ProfileSection: React.FC<ProfileSectionProps> = ({ firstName, lastName, email }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  // Get initials from first and last name
  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase()
    } else {
      return "U" // Default for "User"
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("#avatarButton") && !target.closest("#userDropdown")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    signOut()
    navigate("/login")
  }

  return (
    <div className="relative">
      <button
        id="avatarButton"
        className="flex items-center justify-center w-9 h-9 font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getInitials()}
      </button>

      {isOpen && (
        <div
          id="userDropdown"
          className="absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white z-10 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-medium">
              {firstName} {lastName}
            </div>
            <div className="truncate">{email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
            <li>
              <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100" role="menuitem">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100" role="menuitem">
                Settings
              </a>
            </li>
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100" role="menuitem">
                Profile
              </a>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileSection

