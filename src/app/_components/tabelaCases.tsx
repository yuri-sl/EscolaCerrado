"use client";

import { api } from "~/utils/api";

const TabelaCases = () => {
  const { data: cases, isLoading } = api.case.getAll.useQuery();

  if (isLoading) {
    return <p className="text-center">Carregando cases...</p>;
  }

  return (
    <div className="mt-20 flex flex-col">
      <h1 className="mb-12 ml-[200px] text-center font-gentium text-6xl font-bold">
        Cases cadastrados no sistema:
      </h1>

      {/* Tabela de casos */}
      <div className="ml-[240px] w-[80%] overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th colSpan="3">Tabela de cases</th>
            </tr>
            <tr>
              <th className="px-4 py-2 text-left text-xl font-semibold">
                Título
              </th>
              <th className="px-4 py-2 text-left text-xl font-semibold">
                Descrição
              </th>
              <th className="px-4 py-2 text-left text-xl font-semibold">
                Imagem
              </th>
            </tr>
          </thead>
          <tbody>
            {cases?.map((caseData) => (
              <tr key={caseData.id} className="border-t">
                <td className="px-4 py-2">{caseData.titulo}</td>
                <td className="px-4 py-2">{caseData.descricao}</td>
                <td className="px-4 py-2">
                  <img
                    src={caseData.foto || "/fundoBranco.png"}
                    alt={caseData.titulo}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaCases;
