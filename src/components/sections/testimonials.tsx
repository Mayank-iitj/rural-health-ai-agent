"use client";

import React from 'react';

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    title: 'Rural Health Officer', 
    organization: 'Community Health Center',
    text: 'This AI system has transformed how we provide healthcare guidance in remote villages. The offline capability is crucial when internet connectivity is unreliable.'
  },
  {
    name: 'Rajesh Kumar',
    title: 'Community Health Worker',
    organization: 'Rural Health Mission',
    text: 'The multilingual voice interface helps me assist elderly patients who cannot read. The AI provides accurate triage that saves lives by directing urgent cases to hospitals.'
  },
  {
    name: 'Dr. Meera Patel',
    title: 'Telemedicine Coordinator',
    organization: 'State Health Department',
    text: 'The privacy-first approach builds trust with rural communities. Families feel comfortable sharing symptoms knowing their data stays local and secure.'
  },
  {
    name: 'Amit Singh',
    title: 'NGO Health Program Director',
    organization: 'Rural Care Initiative',
    text: 'Installing this on Raspberry Pi devices makes advanced healthcare AI accessible to the most remote villages. The cost-effectiveness is remarkable.'
  }
];

const Testimonials = () => {
  return (
    <section className="bg-black text-white py-12 sm:py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-8 sm:mb-12 md:mb-20 text-center leading-none">
          HEALTHCARE<span className="text-[#00FF00]">*</span>IMPACT
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg border border-gray-800 hover:border-[#00FF00] transition-colors duration-300">
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#00FF00] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 leading-tight">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[#00FF00] font-medium mb-1">
                    {testimonial.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#cccccc]">
                    {testimonial.organization}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-[#cccccc] leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;