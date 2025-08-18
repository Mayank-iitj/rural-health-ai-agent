"use client";

import { useState } from 'react';
import Image from 'next/image';

const testimonialsData = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/0E6LuVBVdiV0dbIF0qhgZtM4JQ-11.png",
    name: "Sarah Thompson",
    title: "Marketing Director, Bright Ideas Inc.",
    quote: "Working with DesignCube was a game-changer for our brand. Their innovative design solutions and attention to detail helped us create a stunning website that truly represents our values. We’ve seen a significant boost in user engagement and conversions since the redesign.",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/CgDIctvTDOFyPeSfU5OGrX0dHSk-12.png",
    name: "James Williams",
    title: "CEO, TechWorld Solutions",
    quote: "DesignCube's expertise in SEO optimization and digital marketing has dramatically improved our online presence. Their strategic approach and deep understanding of our industry have driven more traffic to our site and increased our sales by 25%.",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/2hKtvu97mgKLaifFbclYx3C64-13.png",
    name: "Emily Davis",
    title: "Founder, Artisan Crafts",
    quote: "The team at DesignCube exceeded our expectations with their creative branding and graphic design services. They captured the essence of our brand perfectly and delivered beautiful, cohesive visuals that have received fantastic feedback from our customers.",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/wYHEdCwM2EtawA0fIzu2egzayU-14.png",
    name: "Michael Brown",
    title: "Product Manager, Innovatech",
    quote: "DesignCube’s UX/UI design expertise transformed our app into a user-friendly and engaging platform. Their collaborative approach and commitment to excellence were evident in every stage of the project. We couldn't be happier with the results.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollDistance = 536 + 32; // card width + gap
  const maxIndex = testimonialsData.length - 2;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  return (
    <section className="relative w-full pb-[120px] bg-black">
      <div className="mx-auto max-w-[1200px] px-20">
        <div className="relative">
          <h2 className="absolute top-0 left-0 text-[72px] font-bold text-white uppercase tracking-[-2.16px] leading-none">
            CUSTOMER*THOUGHTS
          </h2>
          <div className="relative mt-[160px] overflow-visible">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * scrollDistance}px)` }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className="w-[536px] h-[297px] flex-shrink-0 bg-[#181818] rounded-xl p-10">
                  <div className="flex gap-5 items-start h-full">
                    <div className="relative w-[70px] h-[70px] flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={70}
                        height={70}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-medium text-white">{testimonial.name}</h3>
                      <p className="text-base text-[#808080]">{testimonial.title}</p>
                      <p className="mt-2 text-lg text-[#cccccc] leading-snug">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-[60px] right-0 flex gap-5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 bg-[#222222] rounded-full flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/svgs/6tTbkXggWgQCAJ4DO2QEdXXmgM-1.svg"
                alt="Back Arrow"
                width={24}
                height={24}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 bg-[#222222] rounded-full flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/svgs/11KSGbIZoRSg4pjdnUoif6MKHI-2.svg"
                alt="Next Arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;