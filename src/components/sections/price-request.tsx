import React from 'react';

const PriceRequestSection = () => {
  return (
    <section 
      id="contact" 
      className="bg-black text-white py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6">
          PRICE REQUEST
        </h2>
        <h3 className="text-3xl font-medium tracking-tight mb-5 text-white">
          Get a Customized Quote
        </h3>
        <p className="max-w-xl text-lg text-[#808080] leading-relaxed mb-10">
          Tell us about your project, and we'll provide a tailored quote to meet your needs. Our team is ready to help you elevate your brand and achieve your goals.
        </p>
        <a 
          href="https://designcube.framer.ai/get-a-quote"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black text-lg font-medium py-4 px-8 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
};

export default PriceRequestSection;