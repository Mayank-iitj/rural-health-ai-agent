'use client';

import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#', active: true },
  { name: 'Features', href: '#about', active: false },
  { name: 'Healthcare', href: '#services', active: false },
  { name: 'Technology', href: '#technology', active: false },
  { name: 'Contact', href: '#contact', active: false },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-2 sm:py-3 md:py-5 px-2 md:px-1 font-body">
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 md:gap-2 p-1 md:p-2 bg-black/95 backdrop-blur-sm rounded-full shadow-[0px_1px_20px_0px_rgba(0,0,0,0.15)] max-w-[calc(100vw-16px)]">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center px-2 md:px-[18px] h-6 md:h-8 rounded-full text-sm md:text-[18px] font-medium transition-colors duration-300 whitespace-nowrap
                ${item.active 
                  ? 'text-white border border-primary' 
                  : 'text-[#cccccc] hover:text-white'
                }
              `}
            >
              {item.name}
            </a>
          ))}
          <button className="flex items-center justify-center px-2 md:px-[18px] h-6 md:h-8 rounded-full text-sm md:text-[18px] font-medium bg-[#00FF00] text-black transition-transform duration-300 hover:scale-105 whitespace-nowrap">
            <MessageCircle size={16} className="mr-1" />
            AI Assistant
          </button>
        </nav>

        {/* Mobile Navigation */}
        <nav className="sm:hidden flex items-center justify-between w-full px-4 py-2 bg-black/95 backdrop-blur-sm rounded-full shadow-[0px_1px_20px_0px_rgba(0,0,0,0.15)] mx-4">
          <div className="text-white font-bold text-lg">
            Rural<span className="text-[#00FF00]">AI</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 hover:text-[#00FF00] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm sm:hidden">
          <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-medium transition-colors duration-300 ${
                  item.active ? 'text-[#00FF00]' : 'text-white hover:text-[#00FF00]'
                }`}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 bg-[#00FF00] text-black px-6 py-3 rounded-full text-xl font-bold transition-transform duration-300 hover:scale-105"
            >
              <MessageCircle size={24} />
              AI Assistant
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;