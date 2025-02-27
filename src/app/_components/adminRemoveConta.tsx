"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api"; // Cliente tRPC para chamadas de API

export default function DeletarCase() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Mutação para deletar case via tRPC
  const deleteMutation = api.case.delete.useMutation({
    onSuccess: () => {
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        router.push("/cases"); // Redireciona após sucesso
      }, 3000);
    },
    onError: (error) => {
      setErro(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!titulo) {
      setErro("Por favor, insira o título do case!");
      return;
    }
    setErro("");
    deleteMutation.mutate(titulo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[500px] w-[400px] flex-col items-center rounded-[20px] border-[5px] border-gray-300 bg-white p-6 shadow-lg"
    >
      <h1 className="mb-4 text-center text-[32px] font-bold text-gray-800">
        Deletar Case
      </h1>

      <div className="mb-4 w-full">
        <label className="block text-[18px] font-bold text-gray-700">
          Título do Case:
        </label>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full rounded-[20px] bg-gray-100 p-2 text-[16px]"
          placeholder="Insira o título do case"
        />
      </div>

      {/* Exibição de erro */}
      {erro && <p className="font-bold text-red-600">{erro}</p>}

      <div className="flex flex-row gap-4">
        <button
          type="submit"
          className="h-10 w-32 rounded-[20px] bg-red-700 px-4 py-2 text-[18px] font-bold text-white hover:bg-red-900"
        >
          Deletar
        </button>
        <button
          type="button"
          onClick={() => router.push("/cases")}
          className="h-10 w-32 rounded-[20px] bg-gray-500 px-4 py-2 text-[18px] font-bold text-white hover:bg-gray-700"
        >
          Cancelar
        </button>
      </div>

      {/* Mensagem de sucesso */}
      {sucesso && (
        <div className="mt-4 rounded bg-green-500 px-4 py-2 text-[16px] font-bold text-white">
          Case deletado com sucesso!
        </div>
      )}
    </form>
  );
}
