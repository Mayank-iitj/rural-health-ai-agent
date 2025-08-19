import React from 'react';

const awards = [
  {
    title: 'Healthcare Innovation Excellence',
    date: '2024',
    description: 'Recognition for developing offline AI healthcare solutions that bridge the rural-urban healthcare divide through innovative technology deployment.'
  },
  {
    title: 'Privacy-First Technology Award', 
    date: '2024',
    description: 'Honored for implementing fully local AI processing that protects patient privacy while delivering advanced healthcare assistance to underserved communities.'
  },
  {
    title: 'Accessibility in Healthcare Technology',
    date: '2024',
    description: 'Awarded for creating multilingual, voice-enabled healthcare interfaces that serve elderly and non-literate populations in rural areas.'
  },
  {
    title: 'Offline AI Excellence Award',
    date: '2024',
    description: 'Recognition for successfully deploying large language models on resource-constrained hardware, enabling healthcare AI without internet connectivity.'
  },
  {
    title: 'Rural Healthcare Impact Award',
    date: '2024',
    description: 'Acknowledged for creating scalable healthcare solutions that address critical gaps in rural medical access through innovative AI deployment.'
  },
  {
    title: 'Open Source Healthcare Innovation',
    date: '2024',
    description: 'Celebrated for developing open-source healthcare AI tools that enable NGOs and local organizations to deploy community health solutions.'
  }
];

const AwardsSection = () => {
  return (
    <section className="bg-black text-white py-12 sm:py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-8 sm:mb-12 md:mb-20 text-center leading-none">
          RECOGNITION
        </h2>
        
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {awards.map((award, index) => (
            <div key={index} className="border-l-2 border-[#00FF00] pl-4 sm:pl-6 md:pl-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 md:gap-8 mb-2 sm:mb-3 md:mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight flex-1">
                  {award.title}
                </h3>
                <span className="text-base sm:text-lg md:text-xl font-bold text-[#00FF00] flex-shrink-0">
                  {award.date}
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-[#cccccc] leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;