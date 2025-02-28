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
    <div>
      <h1>Deletar um Case</h1>
      <div>
        <input
          type="text"
          placeholder="Digite o título do case"
          value={caseTitle}
          onChange={(e) => setCaseTitle(e.target.value)} // Atualiza o estado
        />
        <button onClick={handleDelete}>Deletar Case</button>
      </div>

      {message && <p>{message}</p>}
      {deleteCaseMutation.isPending && <p>Carregando...</p>}
    </div>
  );
};

export default DeleteCasePage;
