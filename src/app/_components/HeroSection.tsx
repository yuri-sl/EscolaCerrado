import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[650px] md:h-[750px] flex items-center justify-center text-center font-happyMonkey">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/cerrado.png"
          alt="Paisagem do Cerrado"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 -z-10"
        />
      </div>

      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10">
        <h1 className="text-[110px] md:text-[100px] font-bold text-black">
          Escola do Cerrado
        </h1>
        <p className="mt-2 text-[32px] md:text-[30px] text-black">
          Escola Social potencializando presentes e futuros
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
