import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import PrincipalGreeting from "@/components/PrincipalGreeting";
import Gallery from "@/components/Gallery";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statistics />
        <PrincipalGreeting />
        <Gallery />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
