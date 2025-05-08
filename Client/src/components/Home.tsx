import AppComingSoonSection from "./AppComingSoonSection";
import Faq from "./Faq";
import HomeFooter from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Loader from "./Loader";
import Reviews from "./Reviews";
import ValueProposition from "./ValueProposition";
import { MagicMouse } from "magicmouse.ts";
export default function Home() {
  return (
    <MagicMouse color="#fff" MagicMouseOff={true}>
      <div className="overflow-hidden">
        <Header />
        <HeroSection />
        <ValueProposition />
        <AppComingSoonSection />
        <Faq />
        <Reviews />
        <HomeFooter />
      </div>
    </MagicMouse>
  );
}
