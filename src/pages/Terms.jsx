import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Terms() {
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
              <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
              <p className="mb-4">Last updated: July 1, 2025</p>
              <p className="mb-4">Welcome to ShiftWise. These Terms of Service ("Terms") govern your access to and use of the ShiftWise web application ("Service"). By accessing or using ShiftWise, you agree to be bound by these Terms.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">1. Overview</h2>
              <p>ShiftWise is a cloud-based employee shift scheduling platform designed to help organizations create, assign, and manage work schedules.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Registration</h2>
              <ul className="list-disc ml-6">
                <li>You must provide accurate, complete information when creating an account.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You agree to notify us immediately of any unauthorized use of your account.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">3. Eligibility</h2>
              <ul className="list-disc ml-6">
                <li>You must be at least 18 years old to use this Service.</li>
                <li>You must be an authorized representative of your organization to create a company account.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc ml-6">
                <li>Use the Service for unlawful purposes.</li>
                <li>Reverse engineer or attempt to extract source code.</li>
                <li>Upload malicious software or overload our servers.</li>
                <li>Misuse or resell the Service.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">5. Free Plan</h2>
              <p>ShiftWise is currently offered as a free SaaS. We reserve the right to change pricing or introduce paid tiers in the future with advance notice.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Ownership</h2>
              <p>You retain ownership of any content or employee data you upload. We do not sell your data to third parties. You grant us limited rights to process your data to provide and improve the Service.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">7. Privacy</h2>
              <p>Your use of ShiftWise is subject to our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">8. Intellectual Property</h2>
              <p>The Service and all associated content (excluding your uploaded data) is the property of ShiftWise. You may not copy, modify, or distribute our branding, logos, or UI.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">9. Termination</h2>
              <p>We may suspend or terminate your access if:</p>
              <ul className="list-disc ml-6">
                <li>You violate these Terms</li>
                <li>We receive a legal request</li>
                <li>The Service is discontinued</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">10. Limitation of Liability</h2>
              <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">11. Changes to Terms</h2>
              <p>We may modify these Terms from time to time. Continued use of the Service after changes constitutes your acceptance.</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">12. Contact</h2>
              <p>For questions, contact us at: <a href="mailto:support@shiftwiseai.com" className="text-blue-600 underline">support@shiftwiseai.com</a></p>
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
