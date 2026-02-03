import Image from "next/image";


import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventsStreet from "./components/EventsStreet";
import UnmaadJunction from "./components/UnmaadJunction";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col font-sans text-white">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/unmaad assets/blue-bg.png"
          alt="Main Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <Navbar />
      <HeroSection />
      <EventsStreet />
      <UnmaadJunction />
      <Footer />
    </main>
  );
}

