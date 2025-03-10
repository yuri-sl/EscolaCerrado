"use client";
import { useState } from "react";
import { api } from "~/utils/api";

const EditarCase = () => {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Mutation to update case
  const updateMutation = api.case.updateCase.useMutation({
    onSuccess: () => {
      setSucesso(true);
      setErro(""); // Clear error if successful
      setTimeout(() => setSucesso(false), 3000);
    },
    onError: (error) => {
      setErro(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedId = parseInt(id, 10); // Convert to number

    if (isNaN(parsedId)) {
      setErro("ID inválido");
      return;
    }

    updateMutation.mutate({
      id: parsedId, // ✅ Ensure correct field name
      titulo,
      descricao,
      foto,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Editar Case</h1>

      {/* Case ID */}
      <div>
        <label>ID do Case:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
      </div>

      {/* Case Title */}
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      {/* Case Description */}
      <div>
        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      {/* Case Image Upload */}
      <div>
        <label>Foto:</label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  setFoto(event.target.result as string);
                }
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full rounded border p-2"
        />
      </div>

      {/* Display Errors and Success Messages */}
      {erro && <p className="text-red-600">{erro}</p>}
      {sucesso && (
        <p className="text-green-600">Case atualizado com sucesso!</p>
      )}

      {/* Submit Button */}
      <button type="submit" className="rounded bg-Verde px-4 py-2 text-white">
        Atualizar
      </button>
    </form>
  );
};

export default EditarCase;
