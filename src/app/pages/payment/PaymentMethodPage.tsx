"use client"

import type React from "react"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../core/store"
import { MainLayout } from "../../modules/landing/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../modules/shared/components/ui"
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react"
import PaymentGatewayModal from "../../modules/payment/components/modal/PaymentGatewayModal"
//import SuccessPaymentModal from "../../modules/payment/components/modal/SuccessPaymentModal"


// Define types for cart items
interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  type: string
}

// Purchase Plan Modal Component
const PurchasePlanModal: React.FC<{
  onClose: () => void
  onSelectPlan: (plan: string) => void
}> = ({ onClose, onSelectPlan }) => {
  const plans = [
    {
      name: "Basic",
      price: "N2,500",
      searches: "basic plan... Run 2 VIN searches only",
    },
    {
      name: "Standard",
      price: "N10,000",
      searches: "silver plan...  Run 3 VIN searches & 2 Vehicle Reports",
    },
    {
      name: "Premium",
      price: "N20,000",
      searches: "pearl plan... Run 5 VIN searches & 5 Vehicle Reports",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 mt-12">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-lg">
        <div className="p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">All available plans</h2>

          <div className="space-y-3 mb-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="border rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-green-50 cursor-pointer"
                onClick={() => onSelectPlan(plan.name)}
              >
                <div>
                  <h3 className="font-normal text-xs text-[#8E8E93]">PLAN NAME: {plan.name}</h3>
                  <p className="font-bold text-black">{plan.price}</p>
                  <p className="text-xs font-semibold text-black">{plan.searches}</p>
                </div>

                <button className="text-[#34C759] border border-[#34C759] bg-green-50 px-3 py-1 rounded-md text-sm w-full sm:w-auto text-center">
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          <button
            className="w-full bg-green-50 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

const PaymentMethodPage: React.FC = () => {
  const {
    items = [],
    totalPrice = 0,
    //promoCode = null,
    discount = 0,
  } = useSelector((state: RootState) => {
    return state.cart && typeof state.cart === "object"
      ? (state.cart as {
          items: Array<CartItem>
          totalPrice: number
          promoCode: string | null
          discount: number
        })
      : { items: [], totalPrice: 0, promoCode: null, discount: 0 }
  })

  const [selectedMethod, setSelectedMethod] = useState<"oneTime" | "purchase" | null>(null)
  const [showPurchasePlanModal, setShowPurchasePlanModal] = useState(false)
  const [showPaymentGatewayModal, setShowPaymentGatewayModal] = useState(false)
  //const [showSuccessPaymentModal, setShowSuccessPaymentModal] = useState(false)
  const [_selectedPaymentMethod, setSelectedPaymentMethod] = useState<"remita" | "paystack">("paystack")
  const [isItemsExpanded, setIsItemsExpanded] = useState(false)
  const [_paymentDetails, setPaymentDetails] = useState({
    transactionId: "",
    transactionDate: "",
  })
  const navigate = useNavigate()

  const orderTotal = totalPrice - discount

  const handleMethodSelect = (method: "oneTime" | "purchase") => {
    setSelectedMethod(method)
  }

  const handleContinue = () => {
    if (selectedMethod === "oneTime") {
      setShowPaymentGatewayModal(true)
    } else if (selectedMethod === "purchase") {
      setShowPurchasePlanModal(true)
    }
  }

  // Handle payment completion from payment gateway
  const handlePayment = (method: "remita" | "paystack", reference?: string) => {
    setSelectedPaymentMethod(method)

    // Generate transaction details
    const txnId = reference || generateTransactionId()
    const txnDate = getCurrentDate()

    // Save payment details for the success modal
    setPaymentDetails({
      transactionId: txnId,
      transactionDate: txnDate,
    })

    // No need to close the payment gateway modal here as it's handled in the PaymentGatewayModal component
    // for Paystack payments, and here for Remita payments
    if (method === "remita") {
      setShowPaymentGatewayModal(false)
    }

    const paymentInfo = {
      method,
      reference: txnId,
      amount: orderTotal,
      date: txnDate,
    }

    console.log("Payment completed:", paymentInfo)

    // Show success modal
    // setShowSuccessPaymentModal(true)
  }

  const handleGoBack = () => {
    // You can customize this to go to the previous page or a specific route
    navigate(-1)
  }

  // Generate a random transaction ID
  const generateTransactionId = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString()
  }

  // Format current date
  const getCurrentDate = () => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" }
    return date.toLocaleDateString("en-GB", options)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Back Link */}
        <div className="ml-4 sm:ml-8 md:ml-16 lg:ml-24">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={20} className="" />
            <span className="text-sm text-green-600 font-medium">Back</span>
          </button>
        </div>

        {/* Payment Method Title */}
        <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 ml-4 sm:ml-8 md:ml-16 lg:ml-24">Payment Method</h1>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 px-4">
          {/* Payment Method Column */}
          <Card className="w-full lg:max-w-lg">
            <CardContent className="space-y-6 sm:space-y-8 p-4 border-2">
              <div
                className={`cursor-pointer rounded-lg flex items-center transition-all duration-200 ${
                  selectedMethod === "oneTime" ? "" : "border-gray-200"
                }`}
                onClick={() => handleMethodSelect("oneTime")}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === "oneTime"}
                  onChange={() => handleMethodSelect("oneTime")}
                  className="mr-2 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5 text-green-600"
                />
                <div className="flex-grow flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">One-Time Payment</h3>
                    <p className="text-xs sm:text-sm text-gray-500">You pay using either Remita/Paystack once</p>
                  </div>
                </div>
              </div>

              <div
                className={`cursor-pointer rounded-lg flex items-center relative transition-all duration-200 ${
                  selectedMethod === "purchase" ? "" : "border-gray-200"
                }`}
                onClick={() => handleMethodSelect("purchase")}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === "purchase"}
                  onChange={() => handleMethodSelect("purchase")}
                  className="mr-2 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5"
                />
                <div className="flex-grow flex items-center justify-between pr-16 sm:pr-20">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Purchase Payment Plan</h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Subscribe to run multiple searches and <br className="hidden sm:block" />
                      save more cost
                    </p>
                  </div>
                </div>
                <span className="absolute right-0 mr-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded">
                  Recommended
                </span>
              </div>

              <button
                className={`w-full py-2 rounded-lg font-semibold transition ${
                  selectedMethod
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "bg-[#C0EECC] text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleContinue}
                disabled={!selectedMethod}
              >
                Continue
              </button>
            </CardContent>
          </Card>

          {/* Order Summary Column */}
          <Card className="w-full lg:w-[400px] shadow-md p-4 bg-[#F2F2F7]">
            <CardHeader className="px-0 py-2">
              <CardTitle className="text-md font-bold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₦{totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Promo Discount</span>
                    <span className="text-black">-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t-2 pt-3 flex justify-between font-bold text-base sm:text-lg">
                  <span>Est. Total</span>
                  <span>₦{orderTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Items Section with Dropdown */}
        <div className="mt-6 flex justify-center lg:justify-end px-4 lg:mr-24">
          <div className="w-full lg:w-[400px] border rounded-lg bg-gray-50">
            <div
              className="p-3 flex items-center justify-between cursor-pointer"
              onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            >
              <div className="flex items-center">
                <h4 className="text-sm font-semibold mr-2">Your Items ({items.length})</h4>
              </div>
              <span className="text-sm font-bold">
                {isItemsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </div>

            {isItemsExpanded && (
              <div className="border-t p-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center mb-2 last:mb-0">
                    <div className="flex-grow">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500 truncate">{item.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPurchasePlanModal && (
        <PurchasePlanModal
          onClose={() => setShowPurchasePlanModal(false)}
          onSelectPlan={(plan) => {
            console.log(`Selected plan: ${plan}`);
            setShowPurchasePlanModal(false);
            setShowPaymentGatewayModal(true);
          }}
        />
      )}

      {showPaymentGatewayModal && (
        <PaymentGatewayModal
          onClose={() => setShowPaymentGatewayModal(false)}
          onPay={handlePayment}
          total={orderTotal}
          email="customer@example.com" // You should get this from your user state/context
        />
      )}

    </MainLayout>
  )
}

export default PaymentMethodPage