import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Philosophy from "@/components/Philosophy";
import Collections from "@/components/Collections";
import Craftsmanship from "@/components/Craftsmanship";
import BespokeContact from "@/components/BespokeContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#020202]">
      <Navbar />
      <Hero />
      <Showcase />
      <Philosophy />
      <Collections />
      <Craftsmanship />
      <BespokeContact />
      <Footer />
    </main>
  );
}
