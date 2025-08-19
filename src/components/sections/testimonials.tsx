"use client";

import React from 'react';

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    title: 'Rural Health Officer', 
    organization: 'Community Health Center',
    text: 'This AI system has transformed how we provide healthcare guidance in remote villages. The offline capability is crucial when internet connectivity is unreliable.',
    image: '/placeholder-doctor-1.jpg'
  },
  {
    name: 'Rajesh Kumar',
    title: 'Community Health Worker',
    organization: 'Rural Health Mission',
    text: 'The multilingual voice interface helps me assist elderly patients who cannot read. The AI provides accurate triage that saves lives by directing urgent cases to hospitals.',
    image: '/placeholder-health-worker.jpg'
  },
  {
    name: 'Dr. Meera Patel',
    title: 'Telemedicine Coordinator',
    organization: 'State Health Department',
    text: 'The privacy-first approach builds trust with rural communities. Families feel comfortable sharing symptoms knowing their data stays local and secure.',
    image: '/placeholder-doctor-2.jpg'
  },
  {
    name: 'Amit Singh',
    title: 'NGO Health Program Director',
    organization: 'Rural Care Initiative',
    text: 'Installing this on Raspberry Pi devices makes advanced healthcare AI accessible to the most remote villages. The cost-effectiveness is remarkable.',
    image: '/placeholder-ngo-director.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 text-center leading-none">
          HEALTHCARE<span className="text-[#00FF00]">*</span>IMPACT
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-6 md:p-8 rounded-lg border border-gray-800 hover:border-[#00FF00] transition-colors duration-300">
              <div className="flex items-start gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00FF00] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-lg md:text-xl">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-1 leading-tight">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm md:text-base text-[#00FF00] font-medium mb-1">
                    {testimonial.title}
                  </p>
                  <p className="text-sm text-[#cccccc]">
                    {testimonial.organization}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg text-[#cccccc] leading-relaxed italic">
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