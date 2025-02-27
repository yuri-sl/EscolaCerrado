import Image from "next/image";

const SobreNos = () => {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center text-center">
      <h1 className="text-[64px] font-gentium font-bold text-black mb-4">
        Sobre Nós
      </h1>
      <p className="max-w-6xl text-[24px] font-inter mb-10">
        A Escola do Cerrado é uma iniciativa itinerante sediada em Brasília-DF, dedicada a potencializar futuros por meio da educação social. 
        Nossa escola busca integrar a educação formal com a conscientização ambiental, promovendo o respeito à biodiversidade e à cultura local. 
        Além disso, a Escola do Cerrado valoriza a participação ativa dos estudantes, incentivando o pensamento crítico e a formação de cidadãos 
        engajados com questões sociais e ambientais.
      </p>
      
      <div className="relative w-[914px] h-[307px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/EscolaUnb2.png" 
          alt="Escola do Cerrado UnB"
          layout="fill" 
          objectFit="cover" 
        />
      </div>
    </section>
  );
};

export default SobreNos;
