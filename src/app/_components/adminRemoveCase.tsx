import React, { useState } from "react";
import { api } from "~/utils/api";

const DeleteCasePage: React.FC = () => {
  const [caseTitle, setCaseTitle] = useState(""); // Estado para armazenar o título
  const [message, setMessage] = useState("");

  const deleteCaseMutation = api.case.delete.useMutation({
    onSuccess: () => {
      setMessage("Case deletado com sucesso!");
      setCaseTitle(""); // Limpa o input
    },
    onError: (error) => {
      setMessage(`Erro: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (!caseTitle.trim()) {
      setMessage("Por favor, insira um título válido.");
      return;
    }

    deleteCaseMutation.mutate(caseTitle); // ✅ Agora envia o título
  };

  return (
    <div className="border-5 rounded-md border-solid border-black bg-white shadow-md">
      <h2 className="mb-4 text-xl font-bold">Deletar um Case</h2>
      <div>
        <input
          type="text"
          placeholder="Digite o título do case"
          className="w-full rounded border p-2"
          value={caseTitle}
          onChange={(e) => setCaseTitle(e.target.value)} // Atualiza o estado
        />
        <button
          className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-800"
          onClick={handleDelete}
        >
          Deletar Case
        </button>
      </div>

      {message && <p>{message}</p>}
      {deleteCaseMutation.isPending && <p>Carregando...</p>}
    </div>
  );
};

export default DeleteCasePage;
