"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/hooks/useAuth"
import type { VinSearchSectionProps } from "../../types"
import { checkDuplicateVins } from "../../utils/vinValidation"

const VinSearchSection: React.FC<VinSearchSectionProps> = ({
  vinNumber,
  individualVins,
  validationError,
  isSearching,
  handleVinChange,
  handleAddVin,
  handleRemoveVin,
  handleSearch,
  toggleMultipleVin,
}) => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [duplicateError, setDuplicateError] = useState<string | null>(null)

  // Modified function to check for duplicates before adding a VIN
  const handleAddVinWithValidation = () => {
    // Check if the VIN being added already exists in the list
    if (individualVins.includes(vinNumber.trim())) {
      setDuplicateError(`Duplicate VIN: ${vinNumber}. Please enter a unique VIN.`)
      return
    }

    // Check if adding this VIN would create duplicates
    const allVins = [...individualVins, vinNumber.trim()]
    const validation = checkDuplicateVins(allVins)

    if (!validation.isValid) {
      setDuplicateError(validation.error || "Duplicate VIN detected.")
      return
    }

    setDuplicateError(null)
    handleAddVin()
  }

  // Modified search function with duplicate check
  const handleAuthenticatedSearch = () => {
    // Clear previous errors
    setDuplicateError(null)
  
    // If not logged in, show login prompt
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
  
    // Rest of the function remains the same...
    // Check for duplicates
    const allVins = vinNumber.trim() ? [...individualVins, vinNumber.trim()] : [...individualVins]
    const validation = checkDuplicateVins(allVins)
    
    if (!validation.isValid) {
      setDuplicateError(validation.error || "Duplicate VIN detected.")
      return
    }
  
    // Proceed with search
    handleSearch()
  }
  // Navigate to login page
  const navigateToLogin = () => {
    navigate("/login")
  }

  const MAX_INDIVIDUAL_VINS = 4 // Max 4 additional VINs (plus the main input = 5 total)

  return (
    <div className="bg-green-600 flex-grow py-40 px-8 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/herosection.svg')",
        }}
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-white text-5xl font-bold text-center mb-2">VIN SEARCH</h1>
        <p className="text-white text-center mb-8">
          Enter one or multiple VINs to verify the customs duty status of your vehicles
        </p>

        {/* Login prompt overlay */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
              <div className="flex flex-col items-center">
                <svg className="h-12 w-12 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600 text-center mb-6">
                  You need to be logged in to search for VIN numbers. Please login or create an account to continue.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={navigateToLogin}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main VIN input field */}
        <div className="flex items-center gap-4 mb-4 max-w-3xl mx-auto">
          <div className="flex-grow max-w-xl">
            <input
              type="text"
              value={vinNumber}
              onChange={(e) => {
                handleVinChange(e)
                setDuplicateError(null) // Clear duplicate error when input changes
              }}
              placeholder="Enter VIN (Chassis Number)"
              className={`w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border ${
                validationError || duplicateError ? "border-red-400" : "border-white border-opacity-30"
              } focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
              maxLength={17}
            />

            {validationError && <p className="mt-1 text-red-200 text-sm">{validationError}</p>}
            {duplicateError && <p className="mt-1 text-red-200 text-sm">{duplicateError}</p>}
          </div>

          {/* Add "+" button */}
          {individualVins.length < MAX_INDIVIDUAL_VINS && (
            <button
              onClick={handleAddVinWithValidation}
              disabled={!vinNumber.trim() || isSearching}
              className="bg-white text-green-600 px-3 py-3 rounded-md font-bold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add another VIN"
            >
              +
            </button>
          )}

          <button
            onClick={handleAuthenticatedSearch}
            disabled={isSearching || (!vinNumber.trim() && individualVins.length === 0) || !!duplicateError}
            className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <>
                <svg
                  className="animate-spin w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                SEARCHING...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                SEARCH
              </>
            )}
          </button>
        </div>

        {/* Display additional VIN input fields */}
        {individualVins.length > 0 && (
          <div className="mb-4 max-w-3xl mx-auto">
            {individualVins.map((vin, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div className="flex-grow max-w-xl">
                  <input
                    type="text"
                    value={vin}
                    readOnly
                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30"
                  />
                </div>
                <button
                  onClick={() => {
                    handleRemoveVin(index)
                    setDuplicateError(null) // Clear duplicate error when a VIN is removed
                  }}
                  disabled={isSearching}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Remove VIN"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Indicator for when limit is reached */}
        {individualVins.length === MAX_INDIVIDUAL_VINS && (
          <div className="text-white text-center mb-4 italic">
            Maximum of 5 VINs reached. For more, use the option below.
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={toggleMultipleVin}
            disabled={isSearching}
            className="bg-green-600 hover:bg-green-500 text-black px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            For multiple VINs (more than 5), Click here
          </button>
        </div>
      </div>

      {/* Chat bubble icon */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-green-400 rounded-full p-3">
          <img src="/icons/Chaticon.svg" alt="Chat" width={25} height={25} />
        </button>
      </div>
    </div>
  )
}

export default VinSearchSection

