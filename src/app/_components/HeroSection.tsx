import Image from "next/image";
import { Happy_Monkey } from "next/font/google";

// Importa a fonte Happy Monkey
const happyMonkey = Happy_Monkey({
  subsets: ["latin"],
  weight: ["400"], // Happy Monkey só tem peso 400
});

const HeroSection = () => {
  return (
    <section
      className={`relative w-full h-[400px] md:h-[500px] flex items-center justify-center text-center ${happyMonkey.className}`}
    >
      {/* Imagem de fundo */}
      <Image
        src="/cerrado.png"
        alt="Paisagem do Cerrado"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 -z-10"
      />

      {/* Sobreposição para melhorar a legibilidade do texto */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Texto */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          Escola do Cerrado
        </h1>
        <p className="mt-2 text-lg md:text-xl text-black">
          Escola Social potencializando presentes e futuros
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
