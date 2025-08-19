import React from 'react';

const PriceRequestSection = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-none">
          DEPLOYMENT<span className="text-[#00FF00]">*</span>REQUEST
        </h2>
        
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 leading-tight text-[#cccccc]">
          Deploy Rural Health AI in Your Community
        </h3>
        
        <p className="text-lg md:text-xl text-[#cccccc] leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
          Ready to bring AI-powered healthcare to rural communities? Get customized deployment guidance, 
          hardware recommendations, and training support for your organization or region.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
            Request Deployment
          </button>
          <button className="border border-[#00FF00] text-[#00FF00] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#00FF00] hover:text-black transition-all duration-300 w-full sm:w-auto">
            View Technical Specs
          </button>
        </div>
        
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          <div className="p-4 md:p-6 border border-gray-800 rounded-lg">
            <h4 className="text-lg md:text-xl font-bold mb-2 text-[#00FF00]">
              Hardware Setup
            </h4>
            <p className="text-sm md:text-base text-[#cccccc]">
              Raspberry Pi 4, sensors, and solar power solutions
            </p>
          </div>
          <div className="p-4 md:p-6 border border-gray-800 rounded-lg">
            <h4 className="text-lg md:text-xl font-bold mb-2 text-[#00FF00]">
              Training Support
            </h4>
            <p className="text-sm md:text-base text-[#cccccc]">
              Health worker training and community education
            </p>
          </div>
          <div className="p-4 md:p-6 border border-gray-800 rounded-lg">
            <h4 className="text-lg md:text-xl font-bold mb-2 text-[#00FF00]">
              Ongoing Maintenance
            </h4>
            <p className="text-sm md:text-base text-[#cccccc]">
              Updates, monitoring, and technical support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceRequestSection;