import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import UserInfoPage from "@/pages/user-info";
import HomePage from "@/pages/home";
import BMIPage from "@/pages/bmi";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();

  // Pages where header and footer should not be displayed
  const noLayoutPages = ["/login", "/signup", "/user-info"];
  const showLayout = !noLayoutPages.includes(location);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {showLayout && <Header />}
      <main>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/user-info" component={UserInfoPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/bmi" component={BMIPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {showLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
