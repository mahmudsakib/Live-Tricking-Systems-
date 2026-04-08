import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EventSection } from "@/components/EventSection";
import { StatsSection } from "@/components/StatsSection";
import { RegistrationForm } from "@/components/RegistrationForm";
import { ParticipantsSection } from "@/components/ParticipantsSection";
import { AnnouncementSection } from "@/components/AnnouncementSection";
import { Footer } from "@/components/Footer";
import { RegistrationProvider } from "@/context/RegistrationContext";

const Index = () => (
  <RegistrationProvider>
    <Navbar />
    <HeroSection />
    <EventSection />
    <StatsSection />
    <RegistrationForm />
    <ParticipantsSection />
    <AnnouncementSection />
    <Footer />
  </RegistrationProvider>
);

export default Index;
