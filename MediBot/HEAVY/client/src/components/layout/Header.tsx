import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={`font-medium ${isActive('/') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors`}>
                Home
              </a>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/home">
                  <a className={`font-medium ${isActive('/home') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors`}>
                    Dashboard
                  </a>
                </Link>
                <Link href="/bmi">
                  <a className={`font-medium ${isActive('/bmi') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors`}>
                    BMI Calculator
                  </a>
                </Link>
              </>
            ) : (
              <>
                <a href="#features" className="font-medium text-slate-600 hover:text-primary-500 transition-colors">
                  Features
                </a>
                <a href="#bmi" className="font-medium text-slate-600 hover:text-primary-500 transition-colors">
                  BMI Calculator
                </a>
              </>
            )}
            <Link href="/about">
              <a className={`font-medium ${isActive('/about') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors`}>
                About Us
              </a>
            </Link>
            <Link href="/contact">
              <a className={`font-medium ${isActive('/contact') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors`}>
                Contact
              </a>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={() => logout()}
                className="hidden md:block"
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <a className="hidden md:block px-4 py-2 border border-primary-500 rounded-lg text-primary-500 hover:bg-primary-50 transition-colors">
                    Login
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="px-4 py-2 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors">
                    Sign Up
                  </a>
                </Link>
              </>
            )}
            
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden text-2xl text-slate-700"
              aria-label="Toggle mobile menu"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white border-t border-slate-100 pb-4 px-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col space-y-3 pt-3">
          <Link href="/">
            <a 
              className={`font-medium ${isActive('/') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors py-2`}
              onClick={closeMobileMenu}
            >
              Home
            </a>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/home">
                <a 
                  className={`font-medium ${isActive('/home') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors py-2`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </a>
              </Link>
              <Link href="/bmi">
                <a 
                  className={`font-medium ${isActive('/bmi') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors py-2`}
                  onClick={closeMobileMenu}
                >
                  BMI Calculator
                </a>
              </Link>
            </>
          ) : (
            <>
              <a 
                href="#features" 
                className="font-medium text-slate-600 hover:text-primary-500 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Features
              </a>
              <a 
                href="#bmi" 
                className="font-medium text-slate-600 hover:text-primary-500 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                BMI Calculator
              </a>
            </>
          )}
          <Link href="/about">
            <a 
              className={`font-medium ${isActive('/about') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors py-2`}
              onClick={closeMobileMenu}
            >
              About Us
            </a>
          </Link>
          <Link href="/contact">
            <a 
              className={`font-medium ${isActive('/contact') ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'} transition-colors py-2`}
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </Link>
          
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              className="mt-2 w-full"
            >
              Log Out
            </Button>
          ) : (
            <Link href="/login">
              <a 
                className="mt-2 w-full px-4 py-2 border border-primary-500 rounded-lg text-primary-500 hover:bg-primary-50 transition-colors text-center"
                onClick={closeMobileMenu}
              >
                Login
              </a>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
