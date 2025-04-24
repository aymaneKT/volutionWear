import AppComingSoonSection from "./AppComingSoonSection";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Reviews from "./Reviews";
import ValueProposition from "./ValueProposition";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ValueProposition />
      <AppComingSoonSection />
      <Reviews />
    </>
  );
}
