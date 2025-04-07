// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../core/store"
// import Toast from "../components/ToastContainer"
// import PaymentGatewayModal from "../components/modal/PaymentGatewayModal"

// const PaymentPage: React.FC = () => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false)
//   const { items = [], totalPrice = 0, discount = 0 } = useSelector((state: RootState) => state.cart)

//   const orderTotal = totalPrice - discount

//   const handlePaymentComplete = (method: "remita" | "paystack", reference?: string) => {
//     console.log(`Payment completed via ${method}`, reference)
//     // Here you would typically handle the payment completion
//     // For example, redirect to a success page or update order status
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Payment</h1>

//       <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//         <div className="border-t border-b py-4 my-4">
//           <div className="flex justify-between mb-2">
//             <span>Subtotal ({items.length} items)</span>
//             <span>₦{totalPrice.toLocaleString()}.00</span>
//           </div>

//           {discount > 0 && (
//             <div className="flex justify-between mb-2 text-green-600">
//               <span>Discount</span>
//               <span>-₦{discount.toLocaleString()}.00</span>
//             </div>
//           )}

//           <div className="flex justify-between font-bold mt-2 pt-2 border-t">
//             <span>Total</span>
//             <span>₦{orderTotal.toLocaleString()}.00</span>
//           </div>
//         </div>

//         <button
//           onClick={() => setShowPaymentModal(true)}
//           className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
//         >
//           Proceed to Payment
//         </button>
//       </div>

//       {showPaymentModal && (
//         <PaymentGatewayModal
//           onClose={() => setShowPaymentModal(false)}
//           onPay={handlePaymentComplete}
//           total={orderTotal}
//           email="customer@example.com"
//         />
//       )}

//       <Toast />
//     </div>
//   )
// }

// export default PaymentPage

