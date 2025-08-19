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
    <section className="bg-black text-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 text-center leading-none">
          KEY<span className="text-[#00FF00]">*</span>METRICS
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="mb-3 md:mb-4">
                <span className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#00FF00] leading-none block">
                  {metric.number}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 leading-tight">
                {metric.label}
              </h3>
              <p className="text-sm md:text-base text-[#cccccc] leading-relaxed">
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