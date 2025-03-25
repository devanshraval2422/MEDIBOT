import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { register, loginWithGoogle, isLoading } = useAuth();
  const [, navigate] = useLocation();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: "",
    },
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    try {
      await register(data);
      // Redirect is handled in the AuthContext
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  
  const handleGoogleSignup = async () => {
    try {
      setIsGoogleLoading(true);
      
      // For demo purposes, we'll simulate a Google signup
      // In a real app, this would use Google's OAuth flow
      await loginWithGoogle({
        googleId: "google-" + Math.random().toString(36).substring(2, 11),
        email: "demo@example.com",
        name: "Demo User",
      });
      
      // Redirect is handled in the AuthContext
    } catch (error) {
      console.error("Google signup error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
      >
        <div className="mb-6 flex justify-center">
          <Logo size="lg" />
        </div>
        
        <h1 className="font-heading font-bold text-2xl text-center mb-6">Create your account</h1>
        
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors mb-6"
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading || isLoading}
        >
          {isGoogleLoading ? (
            <svg className="animate-spin h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <i className="ri-google-fill text-xl text-[#4285F4]"></i>
          )}
          Sign up with Google
        </Button>
        
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-slate-200"></div>
          <p className="px-3 text-sm text-slate-500">or sign up with email</p>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="john.doe@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="johndoe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : "Create Account"}
            </Button>
          </form>
        </Form>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-primary-500 hover:underline">Sign in</a>
          </Link>
        </p>
        
        <div className="mt-6 pt-6 border-t border-slate-100">
          <Button 
            variant="ghost" 
            className="w-full text-slate-500 hover:text-primary-500"
            onClick={() => navigate("/")}
          >
            <i className="ri-arrow-left-line mr-2"></i> Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
