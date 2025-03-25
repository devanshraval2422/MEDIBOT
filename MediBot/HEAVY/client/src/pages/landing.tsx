import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { FEATURES, TESTIMONIALS } from "@/lib/constants";
import BMICalculator from "@/components/ui/bmi-calculator";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 opacity-70 -z-10"></div>
        <div className="absolute top-1/4 right-0 h-64 w-64 bg-primary-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-1/4 left-0 h-64 w-64 bg-secondary-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-slate-800 leading-tight mb-6">
                Your Personal <span className="text-primary-500">AI Health</span> Assistant
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                MediBot uses advanced AI to provide personalized health guidance, nutrition advice, and medical information tailored to your unique profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  onClick={() => navigate("/signup")}
                  className="px-8 py-3 bg-primary-500 rounded-lg text-white font-medium shadow-lg hover:bg-primary-600 transition-all animate-pulse"
                  size="lg"
                >
                  Join Now
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-3 border border-primary-500 rounded-lg text-primary-500 font-medium hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
                  size="lg"
                >
                  <i className="ri-play-circle-line"></i> Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden text-xs">User</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden text-xs">User</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden text-xs">User</div>
                </div>
                <p className="text-sm text-slate-600"><span className="font-medium">2,500+</span> people already joined</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-5 border border-slate-100 card-hover max-w-md mx-auto">
                <div className="absolute -top-3 -right-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Quick Access
                </div>
                
                <h3 className="font-heading font-bold text-xl mb-4 text-center">Create Your Account</h3>
                
                <div className="mb-5">
                  <Button 
                    onClick={() => navigate("/signup")}
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <i className="ri-google-fill text-xl text-[#4285F4]"></i>
                    Sign up with Google
                  </Button>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <p className="px-3 text-sm text-slate-500">or sign up with email</p>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                      Password
                    </label>
                    <input 
                      type="password" 
                      id="password" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <Button 
                    onClick={() => navigate("/signup")}
                    className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Create Account
                  </Button>
                </form>
                
                <p className="text-center text-sm text-slate-500 mt-4">
                  Already have an account? <a href="/login" className="text-primary-500 hover:underline">Sign in</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-500 rounded-full mb-3">FEATURES</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">AI-Powered Health Assistance</h2>
            <p className="text-lg text-slate-600">MediBot combines advanced AI with medical knowledge to provide personalized health insights and recommendations.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`h-12 w-12 rounded-lg ${feature.bgColor} ${feature.iconColor} flex items-center justify-center mb-4`}>
                  <i className={`${feature.icon} text-2xl`}></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Demo Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
            <motion.div 
              className="lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100 max-w-md mx-auto overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-white">
                      <i className="ri-health-book-line"></i>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base">MediBot</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-xs text-green-500">Online</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <i className="ri-settings-4-line"></i>
                  </button>
                </div>
                
                <div className="h-80 overflow-y-auto flex flex-col gap-4 mb-4">
                  <div className="self-start bg-slate-50 text-slate-800 rounded-lg p-3 shadow-sm">
                    Hello! I'm MediBot, your personal health assistant. How can I help you today?
                  </div>
                  
                  <div className="self-end bg-primary-500 text-white rounded-lg p-3 shadow-sm">
                    I've been having headaches after working on my computer. What could be causing this?
                  </div>
                  
                  <div className="self-start bg-slate-50 text-slate-800 rounded-lg p-3 shadow-sm">
                    I'm sorry to hear about your headaches. They could be caused by several factors related to computer use:
                    
                    <p className="mt-2">1. Eye strain from screen glare or brightness</p>
                    <p>2. Poor posture causing neck tension</p>
                    <p>3. Dehydration during long work sessions</p>
                    
                    <p className="mt-2">Would you like recommendations for each of these potential causes?</p>
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                    placeholder="Type your health question..."
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600">
                    <i className="ri-send-plane-fill text-xl"></i>
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-500 rounded-full mb-3">AI CHATBOT</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">Your 24/7 Health Companion</h2>
              <p className="text-lg text-slate-600 mb-6">
                MediBot combines medical knowledge with your personal health data to provide contextual, accurate health information whenever you need it.
              </p>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Evidence-Based Responses</h4>
                    <p className="text-slate-600 text-sm">All health information is sourced from peer-reviewed medical literature.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Personalized to Your Profile</h4>
                    <p className="text-slate-600 text-sm">Considers your health history, allergies, and biometrics for tailored guidance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Natural Conversations</h4>
                    <p className="text-slate-600 text-sm">Ask questions in plain language and get clear, conversational responses.</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-primary-500 rounded-lg text-white font-medium shadow-lg hover:bg-primary-600 transition-all flex items-center gap-2 mx-auto lg:mx-0"
              >
                Try MediBot Now <i className="ri-arrow-right-line"></i>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section id="bmi" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary-100 text-secondary-500 rounded-full mb-3">BMI CALCULATOR</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">Check Your BMI</h2>
            <p className="text-lg text-slate-600">Our interactive BMI calculator helps you track your health and provides personalized recommendations.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BMICalculator />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-500 rounded-full mb-3">TESTIMONIALS</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">What Our Beta Users Say</h2>
            <p className="text-lg text-slate-600">Hear from people who are already using MediBot to enhance their health journey.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                </div>
                <p className="text-slate-600 mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden text-xs">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Ready to Transform Your Health Journey?</h2>
            <p className="text-lg text-white text-opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of users who are already experiencing the benefits of personalized AI health guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/signup")}
                className="px-8 py-3 bg-white text-primary-500 font-medium rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
                size="lg"
              >
                Join Now
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 bg-transparent border-2 border-white rounded-lg text-white font-medium hover:bg-white hover:bg-opacity-10 transition-all flex items-center justify-center gap-2"
                size="lg"
              >
                <i className="ri-play-circle-line"></i> Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
