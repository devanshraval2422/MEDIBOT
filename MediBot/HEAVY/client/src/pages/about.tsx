import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ABOUT_STATS } from "@/lib/constants";

export default function AboutPage() {
  const [, navigate] = useLocation();

  return (
    <div className="pt-24 md:pt-28 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-100 text-accent-500 rounded-full mb-3">ABOUT US</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">
            Revolutionizing Health Information
          </h1>
          <p className="text-lg text-slate-600">
            We're on a mission to make accurate health information accessible to everyone through the power of AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-heading font-bold text-2xl mb-4">Our Story</h2>
            <p className="text-slate-600 mb-4">
              MediBot was born from a simple observation: accessing reliable health information is often difficult and confusing. Our team of healthcare professionals and AI specialists joined forces to create a solution that makes medical knowledge accessible to everyone.
            </p>
            <p className="text-slate-600 mb-6">
              We believe that preventative healthcare starts with education and awareness. By providing personalized health insights, MediBot empowers users to make informed decisions about their wellbeing.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {ABOUT_STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50 p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  <h4 className="text-3xl font-bold text-primary-500 mb-1">{stat.value}</h4>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <Button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 bg-accent-500 rounded-lg text-white font-medium shadow-lg hover:bg-accent-600 transition-all flex items-center gap-2"
            >
              Join Our Mission <i className="ri-arrow-right-line"></i>
            </Button>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-full h-auto aspect-video rounded-2xl shadow-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <div className="text-6xl text-primary-500 opacity-50">
                  <i className="ri-team-line"></i>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-white">
                    <i className="ri-team-line"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Our Team</h4>
                    <p className="text-xs text-slate-600">Healthcare experts & AI engineers</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  "We're combining medical expertise with cutting-edge AI to create the health assistant everyone deserves."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl text-slate-800 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-slate-600">
              We're guided by a clear mission and strong values that drive everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary-100 text-primary-500 flex items-center justify-center mb-4">
                <i className="ri-accessibility-line text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Accessibility</h3>
              <p className="text-slate-600">Making quality health information available to everyone, regardless of location or background.</p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="h-12 w-12 rounded-lg bg-secondary-100 text-secondary-500 flex items-center justify-center mb-4">
                <i className="ri-verified-badge-line text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Accuracy</h3>
              <p className="text-slate-600">Providing evidence-based information sourced from peer-reviewed medical literature.</p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="h-12 w-12 rounded-lg bg-accent-100 text-accent-500 flex items-center justify-center mb-4">
                <i className="ri-shield-user-line text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Privacy</h3>
              <p className="text-slate-600">Respecting user data with stringent security measures and transparent privacy practices.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="font-heading font-bold text-2xl mb-4">Join the MediBot Community</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Be part of our journey to transform healthcare access through AI technology. Sign up today and experience personalized health guidance.
          </p>
          <Button 
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-white text-primary-500 font-medium rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
          >
            Sign Up Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
