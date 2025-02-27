"use client";

import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import Funcionario from "./Funcionario";

const NossaEquipe = () => {
  const [indiceInicial, setIndiceInicial] = useState(0);
  const [ehMobile, setEhMobile] = useState(false);

  // Usa o tRPC para buscar funcionários
  const { data: funcionarios, isLoading } = api.funcionario.getAll.useQuery();

  const maxVisiveis = 5;
  const maxVisiveisMobile = 2;

  useEffect(() => {
    const verificarTamanhoTela = () => {
      setEhMobile(window.innerWidth < 924);
    };

    verificarTamanhoTela();
    window.addEventListener("resize", verificarTamanhoTela);

    return () => {
      window.removeEventListener("resize", verificarTamanhoTela);
    };
  }, []);

  const irParaProximo = () => {
    const max = ehMobile ? maxVisiveisMobile : maxVisiveis;
    if (funcionarios && indiceInicial + max < funcionarios.length) {
      setIndiceInicial(indiceInicial + 1);
    }
  };

  const irParaAnterior = () => {
    if (indiceInicial > 0) {
      setIndiceInicial(indiceInicial - 1);
    }
  };

  if (isLoading) {
    return <p className="text-center">Carregando equipe...</p>;
  }

  return (
    <main className="mb-20 p-6">
      <h1 className="mb-12 mr-[200px] text-right font-gentium text-6xl font-bold">
        Nossa equipe
      </h1>
      <div className="flex items-center justify-center">
        {funcionarios &&
          funcionarios.length >
            (ehMobile ? maxVisiveisMobile : maxVisiveis) && (
            <button
              onClick={irParaAnterior}
              className="mx-8 rounded bg-Verde px-4 py-2 text-white disabled:opacity-50"
              disabled={indiceInicial === 0}
            >
              &#9665;
            </button>
          )}
        <div className={`flex gap-[150px] ${ehMobile ? "gap-8" : ""}`}>
          {funcionarios
            ?.slice(
              indiceInicial,
              indiceInicial + (ehMobile ? maxVisiveisMobile : maxVisiveis),
            )
            .map((funcionario) => (
              <Funcionario
                key={funcionario.id}
                imagem={funcionario.user.image ?? "/user.png"}
                nome={funcionario.user.name}
                cargo={funcionario.cargo}
              />
            ))}
        </div>
        {funcionarios &&
          funcionarios.length >
            (ehMobile ? maxVisiveisMobile : maxVisiveis) && (
            <button
              onClick={irParaProximo}
              className="mx-8 rounded bg-Verde px-4 py-2 text-white disabled:opacity-50"
              disabled={
                indiceInicial + (ehMobile ? maxVisiveisMobile : maxVisiveis) >=
                funcionarios.length
              }
            >
              &#9655;
            </button>
          )}
      </div>
    </main>
  );
};

export default NossaEquipe;
