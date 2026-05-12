import { Navbar } from "@/components/Navbar";
import { TopAnnouncementBanner } from "@/components/TopAnnouncementBanner";
import { HeroSection } from "@/components/HeroSection";
import { EventSection } from "@/components/EventSection";
import { StatsSection } from "@/components/StatsSection";
import { AnnouncementSection } from "@/components/AnnouncementSection";
import { Footer } from "@/components/Footer";
import { ExpenseSection } from "@/components/ExpenseSection";
import { FloatingFacebookButton } from "@/components/FloatingFacebookButton";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ExpenseProvider } from "@/context/ExpenseContext";

const Index = () => (
  <LanguageProvider>
    <RegistrationProvider>
      <ExpenseProvider>
        <Navbar />
        <TopAnnouncementBanner />
        <HeroSection />
        <ExpenseSection />
        <StatsSection />
        <EventSection />
        <AnnouncementSection />
        <Footer />
        <FloatingFacebookButton />
      </ExpenseProvider>
    </RegistrationProvider>
  </LanguageProvider>
);

export default Index;
