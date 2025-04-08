import axios from "axios"
import * as XLSX from "xlsx"
import type { ApiResponse } from "../types"

const API_BASE_URL = "https://afridev.com.ng/vin"

// Create an axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Function to get authentication token from localStorage
const getAuthToken = () => {
  // Get the access token directly from localStorage
  return localStorage.getItem("access_token")
}

// Add request interceptor to include up-to-date auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const searchVin = async (vinNumber: string): Promise<ApiResponse> => {
  try {
    // For single VIN search
    const response = await apiClient.get(`/single-multi-search/`, {
      params: { vins: vinNumber },
    })

    if (response.data && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data[0], // Return first item for single VIN search
      }
    }
    return { success: false, error: "Invalid response format" }
  } catch (error) {
    console.error("API Error:", error)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        error: "Authentication failed. Please log in again.",
      }
    }
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.message || error.response?.data?.detail || "Server error"
        : "Network error",
    }
  }
}

export const searchMultipleVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
  try {
    // Remove duplicate VINs before making requests
    const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.trim()))]

    // Make separate requests for each unique VIN
    const promises = uniqueVins.map((vin) =>
      apiClient.get(`/single-multi-search/`, {
        params: { vins: vin },
      }),
    )

    const responses = await Promise.all(promises)

    // Combine all the results into a single array
    let combinedResults = responses.flatMap((response) => (Array.isArray(response.data) ? response.data : []))

    // Ensure no duplicate VINs in the results
    // Create a Map with VIN as key to keep only unique entries
    const vinMap = new Map()
    combinedResults.forEach((result) => {
      if (result.vin && !vinMap.has(result.vin)) {
        vinMap.set(result.vin, result)
      }
    })

    // Convert Map back to array
    combinedResults = Array.from(vinMap.values())

    if (combinedResults.length > 0) {
      return {
        success: true,
        data: combinedResults,
      }
    }

    return { success: false, error: "No data returned" }
  } catch (error) {
    console.error("API Error:", error)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        error: "Authentication failed. Please log in again.",
      }
    }
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.message || error.response?.data?.detail || "Server error"
        : "Network error",
    }
  }
}

export const searchUploadedVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
  try {
    // Remove duplicate VINs before creating the Excel file
    const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.replace(/,+$/, "").trim()))]

    // Create an Excel file with the unique VINs
    const wb = XLSX.utils.book_new()
    const wsData = uniqueVins.map((vin) => ({ vin: vin }))
    const ws = XLSX.utils.json_to_sheet(wsData)
    XLSX.utils.book_append_sheet(wb, ws, "VINs")
    const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" })
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const excelFile = new File([excelBlob], "vins.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    const formData = new FormData()
    formData.append("file", excelFile)

    const csrfToken = localStorage.getItem("csrf_token")

    const response = await axios.post(`${API_BASE_URL}/multi-upload-search/`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
      },
    })

    // Check if response contains a "message" field indicating a successful API call
    if (response.data) {
      // Even if all VINs have errors, this is still valid data that should be returned to the client
      // The API is returning the data array with error messages for each VIN
      if (Array.isArray(response.data.data)) {
        // The response format seems to be { message: "Ok", data: [...] }
        return {
          success: true,
          data: response.data.data,
        };
      } else if (Array.isArray(response.data)) {
        // Handle case where response might be a direct array
        return {
          success: true,
          data: response.data,
        };
      }
    }

    return { success: false, error: "Invalid response format" }
  } catch (error) {
    console.error("API Error:", error)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        error: "Authentication failed. Please log in again.",
      }
    }
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      return {
        success: false,
        error: "Server error processing the file. Please check the file format and try again.",
      }
    }
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.message || error.response?.data?.detail || "Server error"
        : "Network error",
    }
  }
}

