"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils"; // Assuming a utility for class names is available at this path. If not, can be defined locally.

const projectRow1 = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/VSgmTjB3esAIEBsN8zmH3e0KUEo-15.png", alt: "Huggl 01 website", href: "https://designcube.framer.ai/projects/huggl-1-0-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/EvCKA7o2VdatFHO6aOdjbIXWTEU-16.png", alt: "Charmant Website Thumbnail", href: "https://designcube.framer.ai/projects/charmant-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/TeLjhJiSPxgMNWneUa2e2Zo-17.png", alt: "Predict Screen", href: "https://designcube.framer.ai/projects/predict-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/eXmDMzjaPw3mPB3gWgVxlv0WjQ-18.png", alt: "Huggl 2.0 website", href: "https://designcube.framer.ai/projects/huggl-2-0-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/4GRQXILMZys5PdVn4VHjCVkJ17w-19.png", alt: "Payble Website Thumbnail", href: "https://designcube.framer.ai/projects/payble-website-made-in-framer" }
];

const plywoodImage = { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/OWRKyo7wdaCEBYCGswlPbEYfsDE-20.jpg", alt: "Plywood artist portfolio", href: "https://designcube.framer.ai/projects/plywood-artist-potrtfolio-made-in-framer" };
const projectRow2 = [
  { ...plywoodImage, alt: "+XZERO® Screen", href: "https://designcube.framer.ai/projects/xzero-website-made-in-framer" },
  { ...plywoodImage, alt: "Wedora Screen", href: "https://designcube.framer.ai/projects/wedora-website-made-in-framer" },
  { ...plywoodImage, alt: "Vistiq spa & wellness", href: "https://designcube.framer.ai/projects/vistiq-spa-wellness" },
  { ...plywoodImage, alt: "Avenzor designer portfolio", href: "https://designcube.framer.ai/projects/avenzor-designer-potrtfolio" },
  { ...plywoodImage },
];

const projectRow3 = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/bHoMJycEVIqbQuBZGPglGrRGd0-21.png", alt: "Pepper Website Thumbnail", href: "https://designcube.framer.ai/projects/pepper-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/yX9Gl8pNA4l5Vs5YOVxoGyoFYWU-22.png", alt: "BrightSites Website Thumbnail", href: "https://designcube.framer.ai/projects/brightsites-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/bJwEJr6t7QDk4iUVUFjAxTz5TLs-23.png", alt: "HealthWell Website Thumbnail", href: "https://designcube.framer.ai/projects/healthwell-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/j81hNjMX2g5xuwiXlJUK8leOn8-24.png", alt: "Reify Website Thumbnail", href: "https://designcube.framer.ai/projects/reify-website-made-in-framer" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/96Z6IpQA2x5XwidjMZuMofmk-25.png", alt: "Cohesion Website Thumbnail", href: "https://designcube.framer.ai/projects/cohesion-website-made-in-framer" }
];

interface Project {
  src: string;
  alt: string;
  href: string;
}

interface MarqueeProps {
  images: Project[];
  direction?: 'left' | 'right';
  duration?: number;
}

const Marquee = ({ images, direction = 'left', duration = 80 }: MarqueeProps) => {
  const allImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex min-w-full shrink-0 items-center gap-10"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {allImages.map((image, index) => (
          <a href={image.href} key={`${image.alt}-${index}`} className="flex-shrink-0" target="_blank" rel="noopener noreferrer">
            <Image
              src={image.src}
              alt={image.alt}
              width={320}
              height={240}
              className="w-80 h-60 object-cover rounded-[20px] transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <section id="projects" className="bg-black text-white flex flex-col items-center gap-[80px] py-[160px] md:py-[120px] px-5 sm:px-5 md:px-10 lg:px-20 w-full">
        <h2 className="text-center text-white font-bold uppercase text-[clamp(3rem,5vw,4.5rem)] leading-none tracking-[-0.02em]">
          OUR<span className="text-primary">*</span>PROJECTS
        </h2>

        <div className="flex flex-col gap-10 w-full max-w-full">
          <Marquee images={projectRow1} direction="left" />
          <Marquee images={projectRow2} direction="right" duration={120} />
          <Marquee images={projectRow3} direction="left" />
        </div>

        <div className="flex flex-col items-center gap-10 mt-10 w-full">
          <h2 className="text-center text-white font-bold uppercase text-[clamp(3rem,3vw,4.5rem)] leading-none tracking-[-0.02em] max-w-4xl">
            WANT TO VIEW ALL OF OUR PROJECTS?
          </h2>
          <a href="https://designcube.framer.ai/projects" className="group relative inline-block font-medium text-base text-black bg-white rounded-full px-12 py-4 overflow-hidden">
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">View Projects</span>
            <span className="absolute left-0 right-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full px-12 py-4">View Projects</span>
          </a>
        </div>
      </section>
    </>
  );
}