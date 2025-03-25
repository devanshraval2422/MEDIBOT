import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSession, login, register, logout, loginWithGoogle } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
  name?: string;
}

interface GoogleCredentials {
  googleId: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (credentials: GoogleCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const user = await getSession();
        setUser(user);
      } catch (error) {
        console.error("Failed to get session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const user = await login(credentials);
      setUser(user);
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${user.name || user.username}!`,
      });
      
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const user = await register(credentials);
      setUser(user);
      
      toast({
        title: "Registered successfully",
        description: "Your account has been created.",
      });
      
      navigate("/user-info");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Username or email already exists.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setUser(null);
      
      toast({
        title: "Logged out successfully",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async (credentials: GoogleCredentials) => {
    try {
      setIsLoading(true);
      const user = await loginWithGoogle(credentials);
      setUser(user);
      
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${user.name || user.email}!`,
      });
      
      navigate("/user-info");
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: "Could not log in with Google.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loginWithGoogle: handleLoginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
