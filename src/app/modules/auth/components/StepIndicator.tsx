import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../core/store"
import type { StepIndicatorProps } from "../../auth/types/auth"
import { REGISTRATION_STEPS } from "../../../modules/auth/constants/auth"

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  // Use the currentStep from props or from the UI state
  const uiCurrentStep = useSelector((state: RootState) => state.ui.currentStep)
  const step = currentStep !== undefined ? currentStep : uiCurrentStep

  return (
    <div className="flex justify-center w-full mb-8">
      {REGISTRATION_STEPS.map((stepItem) => (
        <div key={stepItem.number} className="flex items-start mx-4">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border mr-3 ${
              step >= stepItem.number ? "bg-green-500 text-gray-300 border-green-500" : " text-gray-500 border-gray-300"
            }`}
          >
            {step > stepItem.number ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              stepItem.number
            )}
          </div>
          <div className="flex flex-col">
            <span className={`text-xs ${step >= stepItem.number ? "text-green-500" : "text-gray-500"}`}>
              {stepItem.title}
            </span>
            <span className={`text-xs ${step >= stepItem.number ? "text-green-500" : "text-gray-500"}`}>
              {stepItem.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StepIndicator

