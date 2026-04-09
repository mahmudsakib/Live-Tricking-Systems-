import { Navbar } from "@/components/Navbar";
import { TopAnnouncementBanner } from "@/components/TopAnnouncementBanner";
import { HeroSection } from "@/components/HeroSection";
import { EventSection } from "@/components/EventSection";
import { StatsSection } from "@/components/StatsSection";
import { AnnouncementSection } from "@/components/AnnouncementSection";
import { Footer } from "@/components/Footer";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => (
  <LanguageProvider>
    <RegistrationProvider>
      <Navbar />
      <TopAnnouncementBanner />
      <HeroSection />
      <StatsSection />
      <EventSection />
      <AnnouncementSection />
      <Footer />
    </RegistrationProvider>
  </LanguageProvider>
);

export default Index;
