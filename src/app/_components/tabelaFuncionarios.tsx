"use client";

import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import Funcionario from "./Funcionario";

const TabelaFuncionarios = () => {
  const [ehMobile, setEhMobile] = useState(false);

  // Usa o tRPC para buscar funcionários
  const { data: funcionarios, isLoading } = api.funcionario.getAll.useQuery();

  if (isLoading) {
    return <p className="text-center">Carregando equipe...</p>;
  }

  return (
    <main className="p-2">
      <h1 className="mb-12 mr-[200px] text-right font-gentium text-6xl font-bold">
        Funcionários cadastrados no sistema:
      </h1>
      <div className="overflow-x-auto">
        <table className="border-collaps h-50px min-w-full table-auto border border-gray-300 bg-white">
          <thead className="h-40px bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center" colSpan="6">
                Tabela de funcionários
              </th>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">Id</th>
              <th className="border px-4 py-2 text-left">Nome</th>
              <th className="border px-4 py-2 text-left">Cargo</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Imagem</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios?.map((funcionario) => (
              <tr key={funcionario.id}>
                <td className="border px-4 py-2">{funcionario.user.id}</td>
                <td className="border px-4 py-2">{funcionario.user.name}</td>
                <td className="border px-4 py-2">{funcionario.cargo}</td>
                <td className="border px-4 py-2">{funcionario.user.email}</td>
                <td className="border px-4 py-2">
                  <img
                    src={funcionario.user.image ?? "/user.png"}
                    alt={funcionario.user.name}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TabelaFuncionarios;
