import React from 'react';

const navItems = [
  { name: 'Home', href: '/', active: true },
  { name: 'About', href: '#about', active: false },
  { name: 'Services', href: '#services', active: false },
  { name: 'Projects', href: '#projects', active: false },
  { name: 'Contact', href: '#contact', active: false },
];

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9] flex justify-center py-5 px-1 font-body">
      <nav className="flex items-center gap-2 p-2 bg-black rounded-full shadow-[0px_1px_20px_0px_rgba(0,0,0,0.15)]">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center justify-center px-[18px] h-8 rounded-full text-[18px] font-medium transition-colors duration-300
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
          href="https://framer.link/AdpkeqR"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-[18px] h-8 rounded-full text-[18px] font-medium bg-white text-black transition-transform duration-300 hover:scale-105"
        >
          FREE Remix
        </a>
      </nav>
    </header>
  );
};

export default Navigation;