import Image from "next/image";

const SobreNos = () => {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center text-center">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
        Sobre Nós
      </h1>

      {/* Texto */}
      <p className="max-w-2xl text-gray-700 mb-8">
            A <strong>Escola do Cerrado</strong> é uma iniciativa 
            itinerante sediada em Brasília-DF, dedicada a potencializar futuros por meio da educação social. 
            Nossa escola busca integrar a educação formal com a conscientização ambiental, 
            promovendo o respeito à biodiversidade e à cultura local. 
            Além disso, a Escola do Cerrado valoriza a participação ativa dos estudantes, 
            incentivando o pensamento crítico e a formação de cidadãos 
            engajados com questões sociais e ambientais.
      </p>

      {/* Imagem */}
      <div className="relative w-full max-w-3xl h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
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
