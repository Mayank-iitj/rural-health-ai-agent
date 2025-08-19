import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 py-20 pt-24 sm:pt-28">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[200px] font-bold mb-4 sm:mb-6 md:mb-8 leading-none tracking-tight">
            RURAL<span className="text-[#00FF00]">*</span>HEALTH
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 md:mb-12 leading-none tracking-tight">
            <span className="text-[#00FF00]">AI</span>*SYSTEM
          </h2>
        </div>

        <div className="mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl text-[#cccccc] leading-relaxed mb-4 sm:mb-6">
            Offline AI-powered healthcare assistant for rural communities. Multilingual symptom checker, 
            triage system, and health guidance that works without internet connection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-sm sm:text-base">
              Try AI Assistant
            </button>
            <button className="border border-white text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base">
          <div className="flex flex-col items-center text-center">
            <span className="text-[#00FF00] font-bold text-sm sm:text-base">*OFFLINE CAPABLE</span>
            <span className="text-[#cccccc] text-xs sm:text-sm">Works without internet</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[#00FF00] font-bold text-sm sm:text-base">*MULTILINGUAL</span>
            <span className="text-[#cccccc] text-xs sm:text-sm">Hindi, English, Local dialects</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[#00FF00] font-bold text-sm sm:text-base">*RASPBERRY PI</span>
            <span className="text-[#cccccc] text-xs sm:text-sm">Low-power deployment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;