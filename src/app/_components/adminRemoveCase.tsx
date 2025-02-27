"use client";

import { api } from "~/utils/api";

const NossosCases = () => {
  const { data: cases, isLoading, refetch } = api.case.getAll.useQuery();
  const deleteCaseMutation = api.case.delete.useMutation();

  if (isLoading) {
    return <p className="text-center">Carregando cases...</p>;
  }

  const handleDelete = async (titulo: string) => {
    if (
      !window.confirm(`Tem certeza que deseja excluir o case: "${titulo}"?`)
    ) {
      return;
    }

    try {
      await deleteCaseMutation.mutateAsync(titulo);
      alert("Case deletado com sucesso!");
      refetch(); // Atualiza a lista após a exclusão
    } catch (error) {
      alert("Erro ao deletar o case: " + error.message);
    }
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="mb-12 font-gentium text-6xl font-bold">Cases</h1>

      <div className="w-[90%] overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-3 text-left text-lg font-semibold">
                Título
              </th>
              <th className="border-b px-4 py-3 text-left text-lg font-semibold">
                Descrição
              </th>
              <th className="border-b px-4 py-3 text-left text-lg font-semibold">
                Imagem
              </th>
              <th className="border-b px-4 py-3 text-left text-lg font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {cases?.map((caseData) => (
              <tr
                key={caseData.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-4 py-3">{caseData.titulo}</td>
                <td className="px-4 py-3">{caseData.descricao}</td>
                <td className="px-4 py-3">
                  <img
                    src={caseData.foto || "/fundoBranco.png"}
                    alt={caseData.titulo}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(caseData.titulo)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-800"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cases?.length === 0 && (
          <p className="py-6 text-center text-gray-500">
            Nenhum case encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default NossosCases;
