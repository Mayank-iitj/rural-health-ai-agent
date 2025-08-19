import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 py-20 pt-28">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 md:mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-[200px] font-bold mb-6 md:mb-8 leading-none tracking-tight">
            RURAL<span className="text-[#00FF00]">*</span>HEALTH
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 md:mb-12 leading-none tracking-tight">
            <span className="text-[#00FF00]">AI</span>*SYSTEM
          </h2>
        </div>

        <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-[#cccccc] leading-relaxed mb-6">
            Offline AI-powered healthcare assistant for rural communities. Multilingual symptom checker, 
            triage system, and health guidance that works without internet connection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
              Try AI Assistant
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm md:text-base">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[#00FF00] font-bold">*OFFLINE CAPABLE</span>
            <span className="text-[#cccccc]">Works without internet</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#00FF00] font-bold">*MULTILINGUAL</span>
            <span className="text-[#cccccc]">Hindi, English, Local dialects</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[#00FF00] font-bold">*RASPBERRY PI</span>
            <span className="text-[#cccccc]">Low-power deployment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;