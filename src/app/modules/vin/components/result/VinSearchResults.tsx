"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { VinSearchResultsProps } from "../../types"
import VehicleTeaserResult from "./VehicleTeaserResult"
import type { VehicleDetails } from "../../types"
import { addToCart, CartItem } from "../../../cart/redux/slices/cartSlice"

const VinSearchResults: React.FC<VinSearchResultsProps> = ({ searchResults, onNewSearch, onPurchase: _ }) => {
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number | null>(searchResults.length === 1 ? 0 : null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle selecting a vehicle from the list
  const handleSelectVehicle = (index: number) => {
    setSelectedVehicleIndex(index)
  }

  // Convert vehicle to cart item
  const vehicleToCartItem = (vehicle: VehicleDetails): CartItem => {
    return {
      id: vehicle.vin,
      name: `${vehicle.year} ${vehicle.manufacturer} ${vehicle.model}`,
      quantity: 1,
      price: 7500, // Standard price for CVMS report
      type: "CVMS Standard Report",
    }
  }

  const handleAddToCart = (vehicle: VehicleDetails) => {
    const cartItem = vehicleToCartItem(vehicle)
    dispatch(addToCart(cartItem))
  }

  // Handle purchasing all vehicles
  const handlePurchaseAll = () => {
    // Add all vehicles to cart
    searchResults.forEach((vehicle) => {
      dispatch(addToCart(vehicleToCartItem(vehicle)))
    })

    // Navigate to cart page
    navigate("/cart")
  }

  // If there's only a single result, or a vehicle is selected, show the detail view
  if (searchResults.length === 1 || selectedVehicleIndex !== null) {
    const vehicle = selectedVehicleIndex !== null ? searchResults[selectedVehicleIndex] : searchResults[0]

    return (
      <div className="flex flex-col">
        <VehicleTeaserResult
          vehicle={vehicle}
          onPurchase={() => {
            handleAddToCart(vehicle)
            navigate("/cart")
          }}
          onNewSearch={onNewSearch}
          totalEntries={searchResults.length}  // Pass the total number of entries
        />

        {searchResults.length > 1 && (
          <div className="flex justify-center mt-4 mb-6">
            <button
              onClick={() => setSelectedVehicleIndex(null)}
              className="text-green-600 hover:text-green-500 font-medium flex items-center text-sm md:text-base"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all results
            </button>
          </div>
        )}
      </div>
    )
  }

  // Otherwise, show the list of vehicles
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto my-4 md:my-8 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Search Results</h2>
        <span className="text-gray-500 text-sm md:text-base">{searchResults.length} vehicles found</span>
      </div>

      <div className="space-y-3 md:space-y-4">
        {searchResults.map((vehicle, index) => (
          <div key={vehicle.vin} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-3 sm:mb-0">
                <h3 className="text-base md:text-lg font-medium text-gray-700">
                  {vehicle.year} {vehicle.manufacturer} {vehicle.model}
                </h3>
                <p className="text-sm md:text-base text-gray-500 break-words">VIN: {vehicle.vin}</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => handleSelectVehicle(index)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm md:text-base"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleAddToCart(vehicle)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-sm md:text-base"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase All button - responsive layout */}
      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <button
          onClick={handlePurchaseAll}
          className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium flex items-center justify-center text-sm md:text-base"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add All to Cart
        </button>

        <button 
          onClick={onNewSearch} 
          className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-md text-green-600 hover:text-green-500 hover:bg-gray-50 font-medium flex items-center justify-center text-sm md:text-base"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Start a New Search
        </button>
      </div>
    </div>
  )
}

export default VinSearchResults