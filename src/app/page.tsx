import Navbar from "./_components/navbar";
import NossaEquipe from "./_components/NossaEquipe";
import NossosCases from "./_components/NossosCases";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import SobreNos from "./_components/SobreNos";
import "../styles/globals.css";

export default function Homepage() {
  return (
    <main className="pt-[137px]">
      <Navbar />
      <section>
        <HeroSection />
      </section>
      <section>
        <SobreNos />
      </section>
      <section id="cases">
        <NossosCases />
      </section>
      <section id="equipe">
        <NossaEquipe />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
