import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { isAuthenticated } = useAuth();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Manager at TechCorp",
      content: "ShiftWise reduced our scheduling time by 80%. The AI-powered suggestions are incredibly accurate.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Operations Director",
      content: "Finally, a shift management system that actually understands our business needs. Game changer!",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Store Manager",
      content: "The PDF exports and email notifications save us hours every week. Our team loves it.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
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
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium">Features</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
            <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 font-medium">Reviews</a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
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
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Scheduling</span>
              </div>
              
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
                Transform your workforce scheduling with AI-powered automation. Create, assign, and track employee shifts effortlessly while reducing conflicts and boosting productivity by up to 40%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/signup"}><Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Setup in 5 minutes</span>
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
            <FeatureCard 
              icon={<Calendar className="w-8 h-8" />}
              title="Smart Shift Scheduling" 
              desc="AI-powered scheduling that automatically generates optimal shift plans, handles multi-day ranges, and intelligently skips weekends based on your business needs."
              gradient="from-blue-500 to-cyan-500"
            />
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            See what our customers say about ShiftWise
          </p>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl font-medium text-gray-900 mb-6">
              "{testimonials[activeTestimonial].content}"
            </blockquote>
            <div className="text-lg">
              <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
              <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
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
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            >
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Schedule Demo
            </Button>
          </div>
          
          <p className="mt-6 text-sm opacity-80">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">ShiftWise</div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The modern solution for intelligent shift management. Built with ASP.NET Core and React for reliability and performance.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:border-white">
                  Contact Support
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ShiftWise. All rights reserved. Built with ❤️ for modern teams.</p>
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