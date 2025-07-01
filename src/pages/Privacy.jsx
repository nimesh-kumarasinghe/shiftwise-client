import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Privacy() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            {/* Modern Header */}
            <header className="bg-white/80 backdrop-blur-lg border-gray-100/50 fixed top-0 left-0 right-0 w-full z-50 shadow-sm">
              <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link to={'/'}>
                    <div className="flex items-center space-x-3">
                    <img
                        src="src\assets\logo.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ShiftWise
                    </div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/login"><Button variant="outline" className="border-gray-300 hover:border-blue-500">Login</Button></Link>
                      <Link to="/signup"><Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Get Started</Button></Link>
                    </>
                  ) : (
                    <Link to="/dashboard">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Go to Dashboard
                      </Button>
                    </Link>
                  )}

                </nav>

                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100/50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100/50 px-6 py-4 space-y-4">
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100/50">
                    {!isAuthenticated ? (
                      <>
                        <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Get Started</Button>
                      </>
                    ) : (
                      <Link to="/dashboard"><Button className="w-full bg-blue-600 text-white">Go to Dashboard</Button></Link>
                    )}
                  </div>
                </div>
              )}
            </header>
            <div className="max-w-3xl mx-auto py-12 px-6 text-gray-700 mt-10">
              <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
              <p className="mb-4">Last updated: July 1, 2025</p>

              <p className="mb-4">ShiftWise we respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use the ShiftWise web application ("Service").</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
              <ul className="list-disc ml-6">
                <li><strong>Information You Provide:</strong> name, email, organization info, employee and shift data.</li>
                <li><strong>Automatically Collected:</strong> IP address, browser type, usage logs, session info.</li>
                <li><strong>Cookies:</strong> for session handling and analytics.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc ml-6">
                <li>To provide and maintain the Service</li>
                <li>To send service notifications or updates</li>
                <li>To improve our platform and prevent abuse</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Storage & Security</h2>
              <p>Your data is stored securely using cloud services with encryption and regular backups.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing & Disclosure</h2>
              <ul className="list-disc ml-6">
                <li>We do not sell your data.</li>
                <li>We may share data with service providers under strict agreements.</li>
                <li>We comply with legal requests if required by law.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">5. International Transfers</h2>
              <p>Your data may be transferred internationally depending on your location.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Retention</h2>
              <p>We keep your data while your account is active. You may request deletion anytime.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights (GDPR)</h2>
              <ul className="list-disc ml-6">
                <li>Access, correction, deletion of your data</li>
                <li>Data portability & right to object</li>
                <li>Submit requests via <a href="mailto:privacy@shiftwiseai.com" className="text-blue-600 underline">privacy@shiftwiseai.com</a></li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
              <p>ShiftWise is not intended for individuals under 16 years old.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to This Policy</h2>
              <p>We may revise this policy and post updates on this page.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact</h2>
              <p>Email: <a href="mailto:privacy@shiftwiseai.com" className="text-blue-600 underline">privacy@shiftwiseai.com</a></p>
              <p>Address: ShiftWise AI, Colombo, Sri Lanka</p>
            </div>
            {/* Footer */}
            <footer id="contact" className="bg-gray-50 py-12">
              <div className="max-w-4xl mx-auto px-6">
                {/* Contact Info */}
                <div className="text-center mb-8">
                  <p className="text-gray-600 mb-6">
                    Can't find what you're looking for? <a href="#" className="text-blue-600 hover:underline">Contact us</a>
                  </p>
                </div>
                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-6">
                  <p>&copy; 2025 ShiftWise. All rights reserved.</p>
                  <div className="flex justify-center space-x-6 mt-2">
                    <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
                    <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
                  </div>
                </div>
              </div>
            </footer>
        </div>
    );
}
