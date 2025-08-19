import React from 'react';

const aboutItems = [
  {
    number: '01',
    title: 'Offline AI Healthcare',
    description: 'Advanced AI models optimized to run on low-power devices like Raspberry Pi 4, providing healthcare guidance without internet connectivity.'
  },
  {
    number: '02',
    title: 'Cultural Awareness',
    description: 'Integrated understanding of local remedies, cultural practices, and traditional medicine alongside modern healthcare protocols.'
  },
  {
    number: '03', 
    title: 'Privacy-First Design',
    description: 'All data processing happens locally. No cloud dependencies, no data selling, complete privacy protection for rural communities.'
  },
  {
    number: '04',
    title: 'Accessibility Focus',
    description: 'Voice interface in regional languages, visual aids for non-literate users, and simple yes/no questionnaire design.'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="bg-black text-white py-12 sm:py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-8 sm:mb-12 md:mb-20 text-center leading-none">
          ABOUT<span className="text-[#00FF00]">*</span>RURAL<span className="text-[#00FF00]">*</span>HEALTH<span className="text-[#00FF00]">*</span>AI
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {aboutItems.map((item) => (
            <div key={item.number} className="flex flex-col">
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                <span className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#00FF00] leading-none flex-shrink-0">
                  {item.number}
                </span>
                <div className="flex-1 pt-1 sm:pt-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-[#cccccc] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;