// "use client"

// import type React from "react"
// import type { ErrorMessageProps } from "../../types"

// const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
//   return (
//     <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4 max-w-4xl mx-auto">
//       <div className="flex">
//         <div className="flex-shrink-0">
//           <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//         </div>
//         <div className="ml-3">
//           <h3 className="text-sm font-medium text-red-800">Error</h3>
//           <div className="mt-2 text-sm text-red-700">
//             <p>{message}</p>
//           </div>
//           {onRetry && (
//             <div className="mt-4">
//               <button
//                 type="button"
//                 onClick={onRetry}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ErrorMessage



"use client"

import type React from "react"
import type { ErrorMessageProps } from "../../types"

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full bg-gray-800 py-16 px-4 text-center text-white relative mb-8">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/src/assets/images/vin-background.jpg')" }}
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <svg className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-2xl font-medium mb-2">Error</h3>
          <p className="text-xl mb-6">{message}</p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage

