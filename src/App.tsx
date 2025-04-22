// import React, { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/core/store';
// // import { CartPage } from './app/modules/cart';
// // import PaymentMethodPage from './app/pages/payment/PaymentMethodPage';
// // import Certificate from './app/modules/report/pages/CertificatePage';
// // import VerifyCertificatePage from './app/modules/report/components/report/Certificate';
// // In App.tsx, convert these to lazy loads
// const Certificate = lazy(() => import('./app/modules/report/pages/CertificatePage'));
// const VerifyCertificatePage = lazy(() => import('./app/modules/report/components/report/Certificate'));
// const CartPage = lazy(() => import('./app/modules/cart').then(module => ({ default: module.CartPage })));
// const PaymentMethodPage = lazy(() => import('./app/pages/payment/PaymentMethodPage'));



// // Loading component
// const LoadingFallback = () => <div className="flex h-screen items-center justify-center">Loading...</div>;

// // Lazy load components
// const Home = lazy(() => import('./app/pages/Home'));
// const VinCheckPage = lazy(() => import('./app/pages/vin/VinCheckPage'));
// const AccountType = lazy(() => import('./app/modules/auth/components/AccountTypeStep'));
// const SignUpForm = lazy(() => import('./app/modules/auth/components/SignupForm'));
// const Login = lazy(() => import('./app/modules/auth/components/Login'));
// const OTPVerificationPage = lazy(() => import('./app/modules/auth/components/OTPVerificationPage'));
// const PasswordResetContainer = lazy(() => import('./app/modules/auth/components/PasswordResetContainer'));

// // Modified to allow viewing of VIN page but with restricted functionality
// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Suspense fallback={<LoadingFallback />}>
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/account-type" element={<AccountType />} />
//             <Route path="/signup" element={<SignUpForm />} />
//             <Route path="/verify-otp" element={<OTPVerificationPage />} />
//             <Route path="/login" element={<Login />} />
            
//             {/* Password reset flow */}
//             <Route path="/forgot-password" element={<PasswordResetContainer />} />
//             <Route path="/reset-password-email-sent" element={<PasswordResetContainer />} />
//             <Route path="/reset-password" element={<PasswordResetContainer />} />
//             <Route path="/reset-password-success" element={<PasswordResetContainer />} />
            
//             {/* VIN check page - accessible to all users, but search functionality limited to authenticated users */}
//             <Route path="/vin" element={<VinCheckPage />} />
//             <Route path="/cart" element={<CartPage/>} />
//             <Route path="/payment-method" element={<PaymentMethodPage />} />
//             <Route path="/certificate" element={<Certificate/>} />
//             <Route path="/verify-certificate" element={<VerifyCertificatePage />} />

           
            
//             {/* Fallback route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </Provider>
//   );
// };

// export default App;






import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './app/core/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NINVerificationModal from './app/modules/nin/components/NINVerificationModal';

// Lazy load components
const Certificate = lazy(() => import('./app/modules/report/pages/CertificatePage'));
const VerifyCertificatePage = lazy(() => import('./app/modules/report/components/report/Certificate'));
const CartPage = lazy(() => import('./app/modules/cart').then(module => ({ default: module.CartPage })));
const PaymentMethodPage = lazy(() => import('./app/pages/payment/PaymentMethodPage'));
const Home = lazy(() => import('./app/pages/Home'));
const VinCheckPage = lazy(() => import('./app/pages/vin/VinCheckPage'));
const AccountType = lazy(() => import('./app/modules/auth/components/AccountTypeStep'));
const SignUpForm = lazy(() => import('./app/modules/auth/components/SignupForm'));
const Login = lazy(() => import('./app/modules/auth/components/Login'));
const OTPVerificationPage = lazy(() => import('./app/modules/auth/components/OTPVerificationPage'));
const PasswordResetContainer = lazy(() => import('./app/modules/auth/components/PasswordResetContainer'));

// Loading component
const LoadingFallback = () => <div className="flex h-screen items-center justify-center">Loading...</div>;

// Main App component that doesn't use Redux hooks
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

// Inner component that uses Redux hooks
const AppContent: React.FC = () => {
  return (
    <Router>
      {/* Toast container for notifications */}
      <ToastContainer position="bottom-right" autoClose={5000} />
      
      {/* NIN verification will be handled in a separate component */}
      <NINVerificationCheck />
      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Password reset flow */}
          <Route path="/forgot-password" element={<PasswordResetContainer />} />
          <Route path="/reset-password-email-sent" element={<PasswordResetContainer />} />
          <Route path="/reset-password" element={<PasswordResetContainer />} />
          <Route path="/reset-password-success" element={<PasswordResetContainer />} />
          
          {/* VIN check page */}
          <Route path="/vin" element={<VinCheckPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

// Separate component for NIN verification modal logic
const NINVerificationCheck: React.FC = () => {
  const [showNINModal, setShowNINModal] = React.useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Check for NIN verification status
  React.useEffect(() => {
    if (isAuthenticated && user && !user.NINVerified) {
      // Show modal immediately if NIN isn't verified
      const lastPrompt = localStorage.getItem('lastNINPrompt');
      const now = Date.now();
      
      if (!lastPrompt || now - parseInt(lastPrompt) > 1 * 60 * 1000) { // Changed from 24 hours to 5 minutes
        setShowNINModal(true);
        localStorage.setItem('lastNINPrompt', now.toString());
      }

      // Set up periodic checks (every 5 minutes)
      const interval = setInterval(() => {
        const lastPrompt = localStorage.getItem('lastNINPrompt');
        const now = Date.now();
        
        if (!lastPrompt || now - parseInt(lastPrompt) > 1 * 60 * 1000) { // Changed from 24 hours to 5 minutes
          setShowNINModal(true);
          localStorage.setItem('lastNINPrompt', now.toString());
        }
      }, 1 * 60 * 1000); // Changed from 1 hour to 5 minutes

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);

  return showNINModal ? (
    <NINVerificationModal
      isOpen={showNINModal}
      onClose={() => setShowNINModal(false)}
      onSuccess={() => {
        setShowNINModal(false);
        // Success toast will be shown from within the modal
      }}
    />
  ) : null;
};

export default App;