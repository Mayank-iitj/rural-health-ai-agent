import React from 'react';

const navItems = [
  { name: 'Home', href: '/', active: true },
  { name: 'Features', href: '#features', active: false },
  { name: 'Healthcare', href: '#healthcare', active: false },
  { name: 'Technology', href: '#technology', active: false },
  { name: 'Contact', href: '#contact', active: false },
];

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9] flex justify-center py-3 px-2 md:py-5 md:px-1 font-body">
      <nav className="flex items-center gap-1 md:gap-2 p-1 md:p-2 bg-black rounded-full shadow-[0px_1px_20px_0px_rgba(0,0,0,0.15)] max-w-[calc(100vw-16px)]">
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
        <a
          href="#ai-assistant"
          className="flex items-center justify-center px-2 md:px-[18px] h-6 md:h-8 rounded-full text-sm md:text-[18px] font-medium bg-[#00FF00] text-black transition-transform duration-300 hover:scale-105 whitespace-nowrap"
        >
          AI Assistant
        </a>
      </nav>
    </header>
  );
};

export default Navigation;