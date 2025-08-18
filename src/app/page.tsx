import Navigation from '@/components/sections/navigation';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import KeyMetrics from '@/components/sections/key-metrics';
import TeamSection from '@/components/sections/team';
import AwardsSection from '@/components/sections/awards';
import Testimonials from '@/components/sections/testimonials';
import ServicesSection from '@/components/sections/services';
import PriceRequestSection from '@/components/sections/price-request';
import Projects from '@/components/sections/projects';
import Footer from '@/components/sections/footer';
import { AIAssistant } from '@/components/ai-assistant';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <Projects />
      <AboutSection />
      <KeyMetrics />
      <TeamSection />
      <AwardsSection />
      <Testimonials />
      <ServicesSection />
      <PriceRequestSection />
      <Footer />
      <AIAssistant />
    </main>
  );
}