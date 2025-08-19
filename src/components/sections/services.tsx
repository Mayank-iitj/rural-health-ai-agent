import React from 'react';

const services = [
  {
    number: '01',
    title: 'Symptom Checker & Triage',
    description: 'Multilingual symptom assessment with simple yes/no questions. Provides triage recommendations: self-care, clinic visit, or urgent hospital referral.'
  },
  {
    number: '02',
    title: 'Offline Medical Knowledge',
    description: 'Preloaded WHO guidelines, Ayushman Bharat protocols, and rural healthcare playbooks. Searchable medical database works without internet.'
  },
  {
    number: '03',
    title: 'Voice Assistant Interface',
    description: 'Full speech-to-text and text-to-speech in regional languages. Elderly and illiterate-friendly conversational interface.'
  },
  {
    number: '04',
    title: 'Visual Aid Mode',
    description: 'Icon-driven interface with pictorial symptom representation for non-literate users. Simple visual cues for easy navigation.'
  },
  {
    number: '05',
    title: 'Medication Guidance',
    description: 'Safe dosage information for common OTC medicines. Warns against antibiotic misuse and restricted drug interactions.'
  },
  {
    number: '06',
    title: 'Health Record Creation',
    description: 'Automatic consultation logging with patient unique IDs. Voice or QR code based identification for low-literacy populations.'
  },
  {
    number: '07',
    title: 'Medical Sensor Integration',
    description: 'Bluetooth/USB integration with BP monitors, glucose meters, and pulse oximeters. AI interpretation of sensor data.'
  },
  {
    number: '08',
    title: 'Maternal & Child Health',
    description: 'Pregnancy tracking, vaccination calendars, and child development milestones with automated reminders and alerts.'
  },
  {
    number: '09',
    title: 'Emergency Detection',
    description: 'Critical symptom recognition with immediate escalation protocols. Automated emergency contact and location sharing.'
  },
  {
    number: '10',
    title: 'Health Analytics Dashboard',
    description: 'Privacy-respecting community health statistics. Disease hotspot mapping and vaccination coverage analysis for health workers.'
  },
  {
    number: '11',
    title: 'Gamified Health Education',
    description: 'Interactive storytelling for children about hygiene, nutrition, and disease prevention. Reward-based learning system.'
  },
  {
    number: '12',
    title: 'Privacy & Security Compliance',
    description: 'End-to-end encrypted data sync, local processing, HIPAA compliance. No third-party data sharing or cloud logging.'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-black text-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 text-center leading-none">
          HEALTHCARE<span className="text-[#00FF00]">*</span>FEATURES
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => (
            <div key={service.number} className="flex gap-4 md:gap-6 p-4 md:p-6 border border-gray-800 rounded-lg hover:border-[#00FF00] transition-colors duration-300">
              <span className="text-3xl md:text-4xl font-bold text-[#00FF00] leading-none flex-shrink-0 mt-1">
                {service.number}
              </span>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-[#cccccc] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;