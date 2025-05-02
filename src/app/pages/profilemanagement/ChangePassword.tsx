import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../modules/auth/services";
import OTPDeliveryModal from "../../modules/auth/components/OTPDeliveryModal";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  phone?: string;
  hasPhone?: boolean; // Explicit control for SMS option visibility
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ 
  isOpen, 
  onClose, 
  email, 
  phone = "",
//   hasPhone = true // Force SMS visibility by default
}) => {
  const [currentStep, setCurrentStep] = useState<"form" | "otp">("form");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await authService.changePassword(oldPassword, newPassword);
      setCurrentStep("otp");
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to initiate password change");
    } finally {
      setIsLoading(false);
    }
  };

//   const handleOTPSubmit = async (deliveryMethod: "email" | "sms") => {
//     try {
//       // Here you would typically verify the OTP
//       // For now, we'll just show success
//       toast.success("Password successfully changed");
//       onClose();
//       navigate("/dashboard"); // or "/settings"
//     } catch (err: any) {
//       setError(err.message || "OTP verification failed");
//     }
//   };

const handleOTPSubmit = async (deliveryMethod: "email" | "sms") => {
    try {
      // Here you would typically verify the OTP based on the delivery method
      console.log(`Verifying OTP sent via ${deliveryMethod}`);
      // For now, we'll just show success
      toast.success("Password successfully changed");
      onClose();
      navigate("/dashboard"); // or "/settings"
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    }
  };

  if (!isOpen) return null;

  if (currentStep === "otp") {
    return (
        <OTPDeliveryModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleOTPSubmit}
        email={email}
        phone={phone || "+123456789"} // Provide default phone number if not available
        hasPhone={!!phone} // Show SMS option only if phone is provided
        isPasswordChange={true} // Flag for OTPDeliveryModal to know this is password change flow
        title="Verify Password Change"
        description="To confirm your password change, please choose how you'd like to receive your verification code."
        submitButtonText="Verify"
        showLoginLink={false}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-center mb-4">Change Password</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;