import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="container">
        <div className="flex justify-between items-center py-6 border-t border-[#333333]">
          <a
            href="https://framer.link/AdpkeqR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground text-[16px] font-normal leading-[25.6px] no-underline transition-colors hover:text-primary"
          >
            Remix Template
          </a>
          <a
            href="https://www.framer.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Framer - Custom website builder for designers, agencies and startups."
            className="text-foreground text-[16px] font-normal leading-[25.6px] no-underline transition-colors hover:text-primary"
          >
            Framer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;