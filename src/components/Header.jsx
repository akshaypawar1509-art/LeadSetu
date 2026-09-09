import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onSignOut }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">LS</span>
            </div>
            <h1 className="text-2xl font-bold text-white">LeadSetu</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#pricing" className="text-slate-300 hover:text-white transition">
              Pricing
            </a>
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="text-slate-300 hover:text-white transition">
                  Dashboard
                </a>
                <button
                  onClick={onSignOut}
                  className="btn-ghost text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-slate-300 hover:text-white transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary text-sm"
                >
                  Start Free
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700 pt-4">
            <a href="#pricing" className="block text-slate-300 hover:text-white transition py-2">
              Pricing
            </a>
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="block text-slate-300 hover:text-white transition py-2">
                  Dashboard
                </a>
                <button
                  onClick={onSignOut}
                  className="btn-ghost w-full text-left text-sm mt-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="block text-slate-300 hover:text-white transition py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary w-full text-sm mt-2"
                >
                  Start Free
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
