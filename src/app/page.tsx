import Navbar from "./_components/navbar";
import NossaEquipe from "./_components/NossaEquipe";
import NossosCases from "./_components/NossosCases";
import Footer from "./_components/Footer";
import "../styles/globals.css";

export default function Homepage() {
  return (
    <main className="pt-[137px]">
      <Navbar />
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
