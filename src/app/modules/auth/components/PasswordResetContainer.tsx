import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../core/store"
// import { PasswordResetStep } from "../../../types/auth"
import ForgotPassword from "./ForgotPassword"
import EmailSent from "./EmailSent"
import { PasswordResetStep } from "../types/auth"
import ResetPassword from "./ResetPassword"
import PasswordResetSuccess from "./PasswordResetSuccess"
// import ResetPassword from "./ResetPassword"
// import PasswordResetSuccess from "./PasswordResetSuccess"

const PasswordResetContainer: React.FC = () => {
  const { currentStep } = useSelector((state: RootState) => state.passwordReset)

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case PasswordResetStep.REQUEST:
        return <ForgotPassword />
      case PasswordResetStep.EMAIL_SENT:
        return <EmailSent />
      case PasswordResetStep.RESET_FORM:
        return <ResetPassword />
      case PasswordResetStep.SUCCESS:
        return <PasswordResetSuccess />
      default:
        return <ForgotPassword />
    }
  }

  return renderStep()
}

export default PasswordResetContainer

