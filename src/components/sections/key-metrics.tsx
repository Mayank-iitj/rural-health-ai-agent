import React from 'react';

const metrics = [
  {
    number: '0GB',
    label: 'Internet Required',
    description: 'Fully offline operation'
  },
  {
    number: '24/7',
    label: 'Availability', 
    description: 'Always accessible'
  },
  {
    number: '15+',
    label: 'Languages Supported',
    description: 'Hindi, English & dialects'
  },
  {
    number: '100%',
    label: 'Data Privacy',
    description: 'Local processing only'
  },
  {
    number: '4GB',
    label: 'RAM Required',
    description: 'Raspberry Pi compatible'
  },
  {
    number: '20B',
    label: 'AI Parameters',
    description: 'Advanced medical AI'
  }
];

const KeyMetrics = () => {
  return (
    <section className="bg-black text-white py-12 sm:py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-8 sm:mb-12 md:mb-20 text-center leading-none">
          KEY<span className="text-[#00FF00]">*</span>METRICS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 sm:mb-3 md:mb-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-[#00FF00] leading-none block">
                  {metric.number}
                </span>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 leading-tight">
                {metric.label}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#cccccc] leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;