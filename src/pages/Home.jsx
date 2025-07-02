import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Mail, 
  BarChart3, 
  Shield, 
  Sparkles,
  Clock,
  CheckCircle,
  Zap,
  Star,
  Menu,
  X,
  Rocket,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-gray-100/50 fixed top-0 left-0 right-0 w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How It Works</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            {!isAuthenticated ? (
              <>
                <Link to="/login"><Button variant="outline" className="border-gray-300 hover:border-blue-500 cursor-pointer">Login</Button></Link>
                <Link to="/signup"><Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer">Get Started</Button></Link>
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
            <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium">Features</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium">Contact</a>
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden mt-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* <div className="mt-5 inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Scheduling</span>
              </div> */}
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Shift
                </span>
                <br />
                Management Made
                <br />
                <span className="text-gray-900">Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your workforce scheduling with easy steps. Create, assign, and track employee shifts effortlessly while reducing conflicts and boosting productivity by up to 40%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/signup"}><Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold"
                  >
                    Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Completely free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card needed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Use without limits</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-t-lg mb-6"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">Morning Shift</span>
                    </div>
                    <span className="text-blue-600 font-semibold">8 Staff</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">Evening Shift</span>
                    </div>
                    <span className="text-purple-600 font-semibold">6 Staff</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">All Shifts Covered</span>
                    </div>
                    <span className="text-green-600 font-semibold">100%</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Shifts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your workforce management and eliminate scheduling headaches
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* <FeatureCard 
              icon={<Calendar className="w-8 h-8" />}
              title="Smart Shift Scheduling" 
              desc="AI-powered scheduling that automatically generates optimal shift plans, handles multi-day ranges, and intelligently skips weekends based on your business needs."
              gradient="from-blue-500 to-cyan-500"
            /> */}
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Intelligent Employee Assignment" 
              desc="Assign staff to shifts with smart filters, availability tracking, and conflict detection. Ensure the right people are scheduled at the right times."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard 
              icon={<Mail className="w-8 h-8" />}
              title="Automated Communications" 
              desc="Generate professional PDF schedules and send them via email with one click. Keep your team informed and organized effortlessly."
              gradient="from-green-500 to-teal-500"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Real-time Dashboard" 
              desc="Track shift statistics, identify idle employees, monitor weekly loads, and get actionable insights to optimize your workforce."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard 
              icon={<CalendarCheck className="w-8 h-8" />}
              title="Global Holiday Calendars" 
              desc="Select your country and automatically view national holidays directly in your shift planner. Simplify scheduling with local awareness."
              gradient="from-yellow-500 to-orange-500"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Role-Based Access Control" 
              desc="Secure admin controls for managers and view-only access for employees. Maintain security while keeping everyone informed."
              gradient="from-indigo-500 to-purple-500"
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8" />}
              title="Modern User Experience" 
              desc="Beautiful, intuitive interface built with modern technologies. Designed for ease of use and maximum productivity."
              gradient="from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600">
              Simple setup process that gets you managing shifts like a pro
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <StepCard 
              number="1" 
              title="Sign Up" 
              desc="Create your account and set up your organization profile in under 2 minutes"
              color="blue"
            />
            <StepCard 
              number="2" 
              title="Add Employees" 
              desc="Import your team members with their roles, skills, and availability preferences"
              color="purple"
            />
            <StepCard 
              number="3" 
              title="Create Shifts" 
              desc="Use our smart scheduler to create shifts with flexible dates and time ranges"
              color="green"
            />
            <StepCard 
              number="4" 
              title="Assign Staff" 
              desc="Let AI suggest optimal assignments or manually assign based on your needs"
              color="orange"
            />
            <StepCard 
              number="5" 
              title="Publish & Notify" 
              desc="Confirm schedules, export PDFs, and automatically notify your team"
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Join the Thriving Community of Managers Using ShiftWise
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Trusted by managers globally.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Left side - Join the Wave */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-white flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 border-2 border-white flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 font-medium">Join the Wave</p>
              </div>
            </div>

            {/* Right side - Elevate your projects */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 font-medium">Elevate your scheduling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Shift Management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of organizations already using ShiftWise to streamline their operations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/signup"}>
            <Button
            variant="secondary"
              className="bg-white hover:bg-white hover:text-gray-900 font-semibold px-10 py-6 text-xl cursor-pointer"
            >
              Start for Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-sm opacity-80">
            Completely free • No credit card needed • Use without limits
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Contact Info */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? <a href="#" className="text-blue-600 hover:underline">Contact us</a>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
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

function FeatureCard({ icon, title, desc, gradient }) {
  return (
    <div className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600'
  };

  return (
    <div className="text-center group">
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}