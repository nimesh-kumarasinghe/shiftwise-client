import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import countries from '../data/countries.json';
import timezones from '../data/timezones.json';
import { Mail, Lock, Map, Clock, User } from 'lucide-react';

export default function Signup() {
  const [organizationName, setOrganizationName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', {
        organizationName,
        countryCode,
        timeZone,
        email,
        password,
        role: 'Admin'
      });
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } catch {
      alert('Registration failed. Check inputs or email may already exist.');
    }
  };

  const validatePassword = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return {
      isValid: hasUpper && hasNumber && hasSpecial,
      hasUpper,
      hasNumber,
      hasSpecial
    };
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    const result = validatePassword(val);
    if (!result.isValid) {
      let msg = 'Password must include: ';
      if (!result.hasUpper) msg += 'an uppercase letter, ';
      if (!result.hasNumber) msg += 'a number, ';
      if (!result.hasSpecial) msg += 'a special character (!@#$), ';
      setPasswordError(msg.slice(0, -2)); // remove last comma
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-orange-200 flex">
      {/* Left Side - Promotional Content */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
        <div className="max-w-md ml-50">
          <h1 className="text-7xl font-bold text-gray-800 mb-4">
            Join ShiftWise
          </h1>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Smarter Shift Management Starts Here
          </h1>

          <p className="text-lg text-gray-600 mb-8">
           Sign up to streamline your team's scheduling with AI-driven tools. Create your account and take the first step toward effortless workforce management.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 mr-40">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-50 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign Up</h2>
            <p className="text-gray-500 text-sm mb-8">Welcome! Create Your ShiftWise Account</p>
            
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Organization Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <div className="relative">
                  <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">-- Select Country --</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">-- Select Time Zone --</option>
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>

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
                    onChange={handlePasswordChange}
                    required ={true}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
