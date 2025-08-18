import React from 'react';

const metricsData = [
  {
    value: "0GB",
    title: "Internet Required", 
    description: "Completely offline operation with no external dependencies for healthcare access."
  },
  {
    value: "24/7",
    title: "Available Healthcare",
    description: "Round-the-clock health assistance for remote villages without medical facilities."
  },
  {
    value: "5+",
    title: "Local Languages",
    description: "Supports Hindi and multiple local dialects with voice-enabled interaction."
  },
  {
    value: "100%",
    title: "Data Privacy",
    description: "All patient records stored locally with encrypted on-device management."
  },
  {
    value: "Pi4",
    title: "Minimum Hardware",
    description: "Runs on modest hardware like Raspberry Pi for community health centers."
  },
  {
    value: "20B",
    title: "GPT-OSS Parameters",
    description: "Powered by OpenAI's gpt-oss-20b model fine-tuned for rural healthcare."
  }
];

const KeyMetrics = () => {
  return (
    <section className="bg-black text-foreground py-24 md:py-32">
      <div className="container max-w-[1200px] mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-x-12">
          <div className="lg:col-span-2">
            <h2 className="font-bold uppercase text-[clamp(3rem,5vw,4.5rem)] leading-[1.2]">
              KEY
              <br />
              METRICS
            </h2>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6">
              {metricsData.map((metric, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <h2 className="text-primary text-[clamp(3rem,4vw,4rem)] font-bold leading-none">
                    {metric.value}
                  </h2>
                  <div className='flex flex-col gap-2'>
                    <h3 className="text-foreground text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-tight">
                      {metric.title}
                    </h3>
                    <p className="text-[#cccccc] text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;