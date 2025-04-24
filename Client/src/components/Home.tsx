import AppComingSoonSection from "./AppComingSoonSection";
import HomeFooter from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Loader from "./Loader";
import Reviews from "./Reviews";
import ValueProposition from "./ValueProposition";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Loader />
      <HeroSection />
      <ValueProposition />
      <AppComingSoonSection />
      <Reviews />
      <HomeFooter />
    </div>
  );
}
