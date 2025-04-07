import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/core/store';
import { CartPage } from './app/modules/cart';
import PaymentMethodPage from './app/pages/payment/PaymentMethodPage';
import Certificate from './app/modules/report/pages/CertificatePage';



// Loading component
const LoadingFallback = () => <div className="flex h-screen items-center justify-center">Loading...</div>;

// Lazy load components
const Home = lazy(() => import('./app/pages/Home'));
const VinCheckPage = lazy(() => import('./app/pages/vin/VinCheckPage'));
const AccountType = lazy(() => import('./app/modules/auth/components/AccountTypeStep'));
const SignUpForm = lazy(() => import('./app/modules/auth/components/SignupForm'));
const Login = lazy(() => import('./app/modules/auth/components/Login'));
const OTPVerificationPage = lazy(() => import('./app/modules/auth/components/OTPVerificationPage'));
const PasswordResetContainer = lazy(() => import('./app/modules/auth/components/PasswordResetContainer'));

// Modified to allow viewing of VIN page but with restricted functionality
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
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
            
            {/* VIN check page - accessible to all users, but search functionality limited to authenticated users */}
            <Route path="/vin" element={<VinCheckPage />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/payment-method" element={<PaymentMethodPage />} />
            <Route path="/certificate" element={<Certificate/>} />

           
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;