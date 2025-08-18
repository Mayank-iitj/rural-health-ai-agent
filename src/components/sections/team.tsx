import Image from 'next/image';

type TeamMember = {
  name: string;
  title: string;
  imgSrc: string;
  twitterUrl: string;
};

const teamData: TeamMember[] = [
  {
    name: "Alex Johnson",
    title: "Chief Executive Officer (CEO)",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/LFnQXh6srumwVVF4HWEycyIuG0Q-5.png",
    twitterUrl: "https://x.com/CristianMielu",
  },
  {
    name: "Megan Smith",
    title: "Creative Director",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/UTixYtYPsd5TN5Kmj8fqigwo-6.png",
    twitterUrl: "https://x.com/CristianMielu",
  },
  {
    name: "Michael Davis",
    title: "Lead Developer",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/4wjZwfbCu9WSrGLaPidnqyFVOiY-7.png",
    twitterUrl: "https://x.com/CristianMielu",
  },
  {
    name: "Sophia Martinez",
    title: "Head of UX/UI Design",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/rIRLprwNdsjH8v6vKiovBVtDDUI-8.png",
    twitterUrl: "https://x.com/CristianMielu",
  },
  {
    name: "Daniel Kim",
    title: "Digital Marketing Manager",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/gGAnXJ8rzjZeTLo3eb3ZG21sqlY-9.png",
    twitterUrl: "https://x.com/CristianMielu",
  },
  {
    name: "Emily Brown",
    title: "Senior Project Manager",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b904e1d4-ec29-4df7-b5c0-65014d80d0ea-designcube-framer-ai/assets/images/foZOt3UpapnEFFuIGeQnIZu12vg-10.png",
    twitterUrl: "https://x.com/CristianMielu",
  },
];

const TeamMemberCard = ({ name, title, imgSrc, twitterUrl }: TeamMember) => (
  <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center text-center no-underline">
    <div className="w-full overflow-hidden rounded-lg">
      <Image
        src={imgSrc}
        alt={`Portrait of ${name}`}
        width={512}
        height={512}
        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="mt-6 flex flex-col gap-2">
      <p className="text-2xl font-medium text-white">{name}</p>
      <p className="text-lg text-[#808080]">{title}</p>
      <div className="mt-2 text-lg text-primary group-hover:underline">
        <p>Visit My</p>
        <p>X (Twitter)</p>
      </div>
    </div>
  </a>
);

const TeamSection = () => {
    return (
        <section id="team" className="bg-background text-foreground py-[120px]">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-20">
                <h2 className="text-center text-5xl lg:text-[72px] font-bold uppercase mb-20">
                    MEET<span className="text-primary">*</span>THE<span className="text-primary">*</span>TEAM
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                    {teamData.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                    ))}
                </div>

                <div className="mt-20 pt-10 text-center flex flex-col items-center gap-10">
                    <h3 className="text-3xl font-medium text-white">Want to Join Our Team?</h3>
                    <a href="https://designcube.framer.ai/join-our-team" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-block bg-white text-black py-4 px-8 rounded-full text-lg font-medium transition-transform hover:scale-105 no-underline">
                        Join Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;