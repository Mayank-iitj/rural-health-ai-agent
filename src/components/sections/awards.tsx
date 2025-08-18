import React from 'react';

const awardsData = [
  {
    title: "Best Local Agent Category",
    date: "Competition 2024",
    description: "Rural Health AI qualified for the Best Local Agent category by running a fully offline health assistant using gpt-oss-20b on low-resource hardware.",
  },
  {
    title: "For Humanity Impact Award", 
    date: "Competition 2024",
    description: "Recognized for strong social impact in benefiting rural communities with limited medical access through accessible AI technology.",
  },
  {
    title: "Healthcare AI Innovation",
    date: "Open Source 2024", 
    description: "Showcases the power of gpt-oss models for impactful AI in healthcare by bridging urban-rural health disparities.",
  },
  {
    title: "Privacy-First Technology",
    date: "Tech Ethics 2024",
    description: "Acknowledged for privacy-first healthcare technology that respects local language, culture, and data sovereignty.",
  },
  {
    title: "Offline AI Excellence",
    date: "Edge Computing 2024",
    description: "Demonstrated excellence in offline AI deployment for critical healthcare applications in resource-constrained environments.",
  },
];

const AwardsSection = () => {
  return (
    <section className="bg-background text-foreground py-[120px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
          <div className="flex flex-col gap-[60px]">
            {awardsData.map((award, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
                <div className="flex flex-col gap-5">
                  <h3 className="text-[32px] font-medium leading-tight text-foreground">
                    {award.title}
                  </h3>
                  <p className="text-base text-muted-foreground">{award.date}</p>
                </div>
                <div className="flex items-start">
                  <p className="text-lg leading-[1.6] text-muted-foreground">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="row-start-1 lg:col-start-2">
            <h2 className="text-foreground font-bold uppercase text-[clamp(3rem,5vw,4.5rem)] leading-none">
              AWARDS
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;