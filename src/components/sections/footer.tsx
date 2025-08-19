import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 md:py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#00FF00]">
              Rural Health AI
            </h3>
            <p className="text-sm md:text-base text-[#cccccc] leading-relaxed">
              Offline AI-powered healthcare for rural communities. Privacy-first, 
              multilingual, and accessible to everyone.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4">
              Key Features
            </h4>
            <ul className="space-y-2 text-sm md:text-base text-[#cccccc]">
              <li>• Offline AI Healthcare</li>
              <li>• Multilingual Support</li>
              <li>• Privacy Protection</li>
              <li>• Raspberry Pi Compatible</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4">
              Technology
            </h4>
            <ul className="space-y-2 text-sm md:text-base text-[#cccccc]">
              <li>• Quantized AI Models</li>
              <li>• Voice Recognition</li>
              <li>• Sensor Integration</li>
              <li>• Open Source</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
          <p className="text-sm md:text-base text-[#cccccc] mb-4">
            © 2024 Rural Health AI System. Open source healthcare technology for humanity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <span className="text-sm text-[#cccccc]">
              Built with privacy-first principles
            </span>
            <span className="text-sm text-[#00FF00]">•</span>
            <span className="text-sm text-[#cccccc]">
              Powered by quantized AI models
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;