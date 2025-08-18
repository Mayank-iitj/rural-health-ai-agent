import React from 'react';

const servicesData = [
  {
    number: '01',
    title: 'Offline Health Assistant',
    description: 'Complete AI healthcare assistant running on gpt-oss-20b model without internet connectivity.',
  },
  {
    number: '02',
    title: 'Symptom Triage',
    description: 'Intelligent assessment of symptoms with severity evaluation and care recommendations.',
  },
  {
    number: '03',
    title: 'Voice Interaction',
    description: 'Speech input and output support for users with low literacy in Hindi and local dialects.',
  },
  {
    number: '04',
    title: 'Health Education',
    description: 'Culturally appropriate daily health tips and interactive preventive care content.',
  },
  {
    number: '05',
    title: 'Medical Records',
    description: 'Secure local storage and management of patient health records with medication reminders.',
  },
  {
    number: '06',
    title: 'Sensor Integration',
    description: 'Support for affordable health devices like blood pressure and glucose meters.',
  },
  {
    number: '07',
    title: 'Emergency Detection',
    description: 'Automatic identification of alarming symptoms with emergency care prompts.',
  },
  {
    number: '08',
    title: 'Low-Resource Hardware',
    description: 'Optimized for modest compute resources including Raspberry Pi deployment.',
  },
  {
    number: '09',
    title: 'Multilingual Support',
    description: 'Natural language processing in Hindi and regional dialects for accessibility.',
  },
  {
    number: '10',
    title: 'Community Scalability',
    description: 'Modular design scaling from individual households to community health centers.',
  },
  {
    number: '11',
    title: 'Open Source',
    description: 'Fully open-source codebase with Apache 2.0 license and deployment guides.',
  },
  {
    number: '12',
    title: 'Privacy Compliance',
    description: 'HIPAA-like data protection with full user control and local encryption.',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background py-32 lg:py-40">
      <div className="container">
        <h2 className="text-center uppercase mb-20">
          SERVICES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-20">
          {servicesData.map((service) => (
            <div key={service.number} className="flex items-start gap-6">
              <div 
                className="text-primary font-bold leading-none -mt-1"
                style={{ fontSize: 'clamp(3rem, 5vw, 4rem)' }}
              >
                {service.number}
              </div>
              <div className="pt-2">
                <h3 className="mb-4">{service.title}</h3>
                <p className="text-muted">
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