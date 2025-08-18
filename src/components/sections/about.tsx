import React from 'react';

// Define the type for an individual about item
interface AboutItem {
  number: string;
  title: string;
  description: string;
}

// Array of about items data, ordered as they appear on the site
const aboutItems: AboutItem[] = [
  {
    number: "04",
    title: "Privacy-First Healthcare Technology",
    description: "All patient data remains locally stored, ensuring HIPAA-like compliance without internet dependency.",
  },
  {
    number: "03",
    title: "Bridging the Healthcare Gap",
    description: "Bringing advanced AI healthcare assistance to underserved rural communities with limited medical access.",
  },
  {
    number: "02",
    title: "Culturally Aware AI Assistant",
    description: "Supports Hindi and local dialects with voice interaction designed for low-literacy users.",
  },
  {
    number: "01",
    title: "Offline AI-Powered Healthcare",
    description: "Complete healthcare assistant running on gpt-oss-20b model without requiring internet connectivity.",
  },
];

// Reusable component for each item in the "About Us" section
const AboutItemCard: React.FC<AboutItem> = ({ number, title, description }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.4fr_1fr] xl:grid-cols-[0.2fr_1fr] md:gap-10 items-start md:items-center">
      <p className="font-bold text-primary text-[clamp(3rem,4vw,4rem)] leading-none -tracking-[0.02em]">
        {number}
      </p>
      <div>
        <h3 className="text-foreground font-medium text-[clamp(1.5rem,2.5vw,2rem)] leading-snug -tracking-[0.02em] mb-5 uppercase">
          {title}
        </h3>
        <p className="text-muted max-w-md text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Main "About Us" section component
const AboutSection = () => {
  return (
    <section id="about" className="bg-background text-foreground pt-[120px] pb-[100px] px-5 md:px-20">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-foreground font-bold text-[clamp(3rem,5vw,4.5rem)] uppercase mb-20 leading-tight -tracking-[0.02em]">
          ABOUT*US
        </h2>
        <div className="grid grid-cols-1 gap-[60px]">
          {aboutItems.map((item) => (
            <AboutItemCard key={item.number} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;