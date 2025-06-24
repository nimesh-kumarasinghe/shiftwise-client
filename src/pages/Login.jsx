import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await axios.post('/auth/login', { email, password });
      login(res.data.token, remember);
      navigate('/dashboard');
    } catch {
      alert('Login failed. Please check your email and password.');
    }
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/auth/request-reset', { email: resetEmail });
      setResetStep(2);
      setResetError('');
    } catch {
      setResetError('User not found or error sending code.');
    }finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/auth/verify-otp', { email: resetEmail, otp });
      setResetStep(3);
      setResetError('');
    } catch {
      setResetError('Invalid or expired code.');
    } finally {
      setIsLoading(false);
    }
  };


  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/auth/reset-password', {
        email: resetEmail,
        otp,
        newPassword
      });
      setResetMessage('Password reset successful. You can now log in.');
      setResetError('');
      setTimeout(() => {
        setShowResetModal(false);
        setResetStep(1);
      }, 2000);
    } catch {
      setResetError('Could not reset password. Try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-indigo-200 flex">
      {/* Left Side - Promotional Content */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
        <div className="max-w-md ml-50">
          <h1 className="text-7xl font-bold text-gray-800 mb-4">
            Shift Management
          </h1>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Made Simple
          </h1>

          <p className="text-lg text-gray-600 mb-8">
           Transform your workforce scheduling with AI-powered automation. Create, assign, and track employee shifts effortlessly.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 mr-40">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-50 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-500 text-sm mb-8">Welcome back! Please sign in to your account</p>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 ..."
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" onClick={() => setShowResetModal(true)} className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-opacity-01 backdrop-blur-lg shadow-xl flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setShowResetModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Reset Password</h3>

            {resetStep === 1 && (
              <>
              <form onSubmit={sendCode}>
                <p className='mb-3 text-gray-800'>Enter your registered email and we will send you 6-digit OTP to continue password reset</p>
                <div className="relative mb-4">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your registered email address"
                  />
                </div>
                     
                <button 
                  className={`w-full py-2 rounded-lg transition ${
                              isLoading
                                ? 'bg-gray-400 text-white cursor-not-allowed pointer-events-none'
                                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                            }`}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Sending...
                    </span>
                  ) : 'Send Code'}
                </button>
              </form>
              </>
            )}

            {resetStep === 2 && (
              <>
              <form onSubmit={verifyCode}>
                <div className="relative mb-4">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter 6 digit OTP sent to your email"
                  />
                </div>
                <button 
                  className={`w-full py-2 rounded-lg transition ${
                              isLoading
                                ? 'bg-gray-400 text-white cursor-not-allowed pointer-events-none'
                                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                            }`}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Verifying...
                    </span>
                  ) : 'Verify Code'}
                </button>
              </form>
              </>
            )}

            {resetStep === 3 && (
              <>
              <form onSubmit={resetPassword}>
                <div className="relative mb-4">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your new password"
                  />
                </div>
                <button 
                  className={`w-full py-2 rounded-lg transition ${
                              isLoading
                                ? 'bg-gray-400 text-white cursor-not-allowed pointer-events-none'
                                : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                            }`}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Saving...
                    </span>
                  ) : 'Set New Password'}
                </button>
              </form>
              </>
            )}

            {resetError && <p className="text-sm text-red-500 mt-3">{resetError}</p>}
            {resetMessage && <p className="text-sm text-green-600 mt-3">{resetMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}