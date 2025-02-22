import Navbar from "./_components/navbar";
import NossaEquipe from "./_components/NossaEquipe";
import NossosCases from "./_components/NossosCases";
import "../styles/globals.css";

export default function Homepage() {
  return (
    <main>
      <Navbar />
      <NossosCases />
      <NossaEquipe />

    </main>
  );
}
