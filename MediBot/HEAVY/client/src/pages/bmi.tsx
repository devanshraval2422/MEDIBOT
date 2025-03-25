import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { calculateBMI, getBMICategory, createOrUpdateHealthProfile } from "@/lib/api";
import BMICalculator from "@/components/ui/bmi-calculator";
import { useToast } from "@/hooks/use-toast";

export default function BMIPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: healthProfile, isLoading } = useQuery({
    queryKey: ["/api/health-profile"],
    enabled: isAuthenticated
  });

  const updateProfileMutation = useMutation({
    mutationFn: createOrUpdateHealthProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/health-profile"] });
      toast({
        title: "Profile updated",
        description: "Your health profile has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update your health profile. Please try again.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleBMICalculate = (bmi: number, data: { weight: number; height: number; age: number; gender: string }) => {
    // If profile exists and values have changed, update the profile
    if (healthProfile) {
      if (healthProfile.weight !== data.weight || 
          healthProfile.height !== data.height || 
          healthProfile.age !== data.age || 
          healthProfile.gender !== data.gender) {
        updateProfileMutation.mutate(data);
      }
    } else {
      // Create a new profile
      updateProfileMutation.mutate(data);
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary-100 text-secondary-500 rounded-full mb-3">BMI CALCULATOR</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">
            Check Your Body Mass Index
          </h1>
          <p className="text-lg text-slate-600">
            Our interactive BMI calculator helps you track your health and provides personalized recommendations based on your results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-4 h-4 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-4 h-4 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          ) : (
            <BMICalculator 
              initialData={healthProfile} 
              onCalculate={handleBMICalculate}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="h-12 w-12 rounded-lg bg-green-100 text-green-500 flex items-center justify-center mb-4">
                <i className="ri-heart-pulse-line text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Healthy Range</h3>
              <p className="text-slate-600">BMI between 18.5 and 24.9 indicates a weight that's healthy for your height.</p>
            </div>
            
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="h-12 w-12 rounded-lg bg-yellow-100 text-yellow-500 flex items-center justify-center mb-4">
                <i className="ri-scales-3-line text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Regular Monitoring</h3>
              <p className="text-slate-600">Check your BMI regularly as it can change with significant weight or muscle gain/loss.</p>
            </div>
            
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary-100 text-primary-500 flex items-center justify-center mb-4">
                <i className="ri-user-heart-line text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Beyond BMI</h3>
              <p className="text-slate-600">BMI is just one indicator of health. Consult healthcare professionals for comprehensive advice.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white text-center max-w-4xl mx-auto"
        >
          <h2 className="font-heading font-bold text-2xl mb-4">Get Personalized Health Advice</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Looking for more detailed health guidance? Talk to MediBot for personalized recommendations based on your BMI and health profile.
          </p>
          <button 
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-white text-primary-500 font-medium rounded-lg shadow-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
          >
            Chat with MediBot <i className="ri-arrow-right-line"></i>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
