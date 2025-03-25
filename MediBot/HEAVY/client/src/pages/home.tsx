import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { calculateBMI, getBMICategory } from "@/lib/api";
import Chatbot from "@/components/ui/chatbot";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();

  const { data: healthProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["/api/health-profile"],
    enabled: isAuthenticated
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Calculate BMI if health profile exists
  const bmi = healthProfile ? calculateBMI(healthProfile.weight, healthProfile.height) : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="pt-24 md:pt-28 pb-16 min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-lg text-slate-600">
            How can MediBot assist with your health today?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
              <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
                <i className="ri-message-3-line text-primary-500"></i> Health Assistant
              </h2>
              <Chatbot />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100 mb-8">
              <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
                <i className="ri-user-settings-line text-primary-500"></i> Your Profile
              </h2>
              
              {profileLoading ? (
                <div className="flex justify-center p-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              ) : healthProfile ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Age:</span>
                    <span className="font-medium">{healthProfile.age} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Gender:</span>
                    <span className="font-medium capitalize">{healthProfile.gender}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Height:</span>
                    <span className="font-medium">{healthProfile.height} cm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Weight:</span>
                    <span className="font-medium">{healthProfile.weight} kg</span>
                  </div>
                  {bmi && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">BMI:</span>
                      <span className="font-medium">{bmi.toFixed(1)} ({bmiCategory?.category})</span>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate("/user-info")}
                  >
                    Update Profile
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">You haven't completed your health profile yet.</p>
                  <Button 
                    onClick={() => navigate("/user-info")}
                    className="bg-primary-500 text-white"
                  >
                    Complete Profile
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
              <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
                <i className="ri-calculator-line text-secondary-500"></i> BMI Tracker
              </h2>
              
              {bmi ? (
                <div>
                  <div className="text-center mb-6">
                    <div className="relative inline-block h-24 w-24 rounded-full border-8 border-slate-100 mb-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold" style={{ color: bmiCategory?.color }}>
                          {bmi.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-medium" style={{ color: bmiCategory?.color }}>
                      {bmiCategory?.category}
                    </h4>
                  </div>
                  
                  <div className="mb-6">
                    <div className="relative h-4 w-full bg-gradient-to-r from-yellow-400 via-green-500 via-yellow-400 to-red-500 rounded-lg mb-1">
                      <div 
                        className="absolute top-0 w-2 h-6 bg-white border-2 border-slate-700 rounded-sm transform -translate-x-1/2 -translate-y-1"
                        style={{ left: `${bmi < 16 ? 0 : bmi > 40 ? 100 : ((bmi - 16) / 24) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>16</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate("/bmi")}
                  >
                    View Full BMI Details
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-slate-600 mb-4">Complete your profile to see your BMI.</p>
                  <Button 
                    onClick={() => navigate("/bmi")}
                    className="bg-secondary-500 text-white"
                  >
                    Check Your BMI
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
