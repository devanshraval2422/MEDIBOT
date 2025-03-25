import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/ui/profile-form";
import { type HealthProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Logo from "@/components/Logo";

export default function UserInfoPage() {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { data: healthProfile, isLoading } = useQuery({
    queryKey: ["/api/health-profile"],
    enabled: isAuthenticated
  });

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleProfileSubmitted = (profile: HealthProfile) => {
    setHasSubmitted(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="py-8 px-4 flex justify-center">
        <Logo size="lg" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        {hasSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100 max-w-md w-full text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                <i className="ri-check-line text-3xl"></i>
              </div>
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3">Profile Complete!</h2>
            <p className="text-slate-600 mb-8">
              Thanks for providing your health information. We'll use this to personalize your experience.
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mb-8"
            >
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">
                Let's Personalize Your Experience
              </h1>
              <p className="text-lg text-slate-600">
                To provide you with accurate health information and recommendations, we need to know a bit more about you.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center p-12">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-4 h-4 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-4 h-4 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            ) : (
              <ProfileForm
                initialData={healthProfile}
                onSuccess={handleProfileSubmitted}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
