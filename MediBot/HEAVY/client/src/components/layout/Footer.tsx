import Logo from "@/components/Logo";
import { APP_DESCRIPTION, SOCIAL_LINKS } from "@/lib/constants";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo textClassName="text-white" className="mb-4" />
            <p className="text-slate-400 mb-4">
              {APP_DESCRIPTION}
            </p>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="h-10 w-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-slate-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#bmi" className="text-slate-400 hover:text-white transition-colors">BMI Calculator</a>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-slate-400 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-slate-400 hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Subscribe</h3>
            <p className="text-slate-400 mb-4">Stay updated with the latest features and releases.</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button 
                  type="submit"
                  className="bg-primary-500 text-white px-4 py-2 rounded-r-lg hover:bg-primary-600 transition-colors"
                  aria-label="Subscribe"
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </form>
            <p className="text-xs text-slate-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MediBot. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
