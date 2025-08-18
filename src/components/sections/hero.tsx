import Image from 'next/image';
import { Plus } from 'lucide-react';

const services = [
  "Offline AI Health Assistant", "Symptom Triage", "Medical Advice", "Voice Interaction", "Health Records",
  "Sensor Integration", "Rural Healthcare", "Privacy First", "Local Deployment", 
  "Hindi Support", "Emergency Detection", "Health Education", "Community Care",
];

const HeroTicker = () => (
    <div className="absolute top-[120px] left-0 flex w-full h-[36px] overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee-slow shrink-0 items-center">
            {services.map((service, index) => (
                <div key={index} className="flex items-center mx-4">
                    <p className="text-nowrap text-2xl font-medium uppercase text-white">{service}</p>
                    <Plus className="text-primary ml-8 shrink-0" size={24} />
                </div>
            ))}
        </div>
        <div className="flex animate-marquee-slow shrink-0 items-center" aria-hidden="true">
            {services.map((service, index) => (
                <div key={index + services.length} className="flex items-center mx-4">
                    <p className="text-nowrap text-2xl font-medium uppercase text-white">{service}</p>
                    <Plus className="text-primary ml-8 shrink-0" size={24} />
                </div>
            ))}
        </div>
    </div>
);


const HeroSection = () => {
    return (
        <section className="relative w-full bg-black text-white" style={{ height: '940px' }}>
            <HeroTicker />
            
            <div className="absolute top-[196px] inset-x-0 h-auto flex items-center justify-center pointer-events-none">
                <div className="flex items-center justify-center">
                    <h1 className="font-display font-bold text-white leading-[0.8] tracking-[-0.04em] text-[clamp(5rem,12vw,10rem)]">
                        RURAL<span className="text-primary">*</span>HEALTH
                    </h1>
                    <div className="mx-[clamp(1rem,4vw,2rem)] relative flex-shrink-0 w-[clamp(240px,30vw,380px)] h-[clamp(320px,40vw,507px)] pointer-events-auto">
                        <div className="w-full h-full rounded-[200px] border-2 border-primary overflow-hidden">
                             <Image
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/HowmrQKMjv4J2RQAp5h9XISrO0E-4.jpg"
                                alt="Rural Health AI interface"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="font-display font-bold text-white leading-[0.8] tracking-[-0.04em] text-[clamp(5rem,12vw,10rem)]">
                        <span className="text-primary">*</span>AI
                    </h1>
                </div>
            </div>

            <a href="#projects" 
               className="absolute left-1/2 -translate-x-1/2 bottom-[250px] bg-white text-black py-5 px-10 rounded-full font-body font-medium text-lg hover:scale-105 transition-transform duration-300 z-10">
                View Demo
            </a>

            <div className="absolute bottom-[80px] w-full max-w-[1200px] left-1/2 -translate-x-1/2 px-5 md:px-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0">
                <p className="max-w-md text-muted-foreground text-lg text-center md:text-left">
                    Offline GPT-OSS Agent for Accessible Healthcare in Remote Villages. Powered by gpt-oss-20b, providing symptom triage, health education, and voice-enabled interaction in Hindi and local dialects.
                </p>
                <div className="text-center md:text-right shrink-0">
                    <p className="text-base font-body uppercase text-[#CCCCCC]">*CATEGORY — BEST LOCAL AGENT</p>
                    <p className="text-base font-body uppercase text-[#CCCCCC]">FOR HUMANITY IMPACT</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;