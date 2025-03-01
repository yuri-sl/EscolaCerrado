"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api"; // Cliente tRPC para chamadas de API

export default function AdminDeletarConta() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Busca todos os usuários
  const { data: usersData } = api.auth.getUsers.useQuery();

  useEffect(() => {
    if (usersData) {
      setUsuarios(usersData);
    }
  }, [usersData]);

  // Mutação para deletar conta via tRPC
  const deleteMutation = api.auth.deleteUser.useMutation({
    onSuccess: () => {
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        router.push("/admin/tabelaFunc"); // Redireciona após sucesso
      }, 3000);
    },
    onError: (error) => {
      setErro(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!userName) {
      setErro("Selecione um usuário!");
      return;
    }
    setErro("");
    deleteMutation.mutate({ nome: userName });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[500px] w-[400px] flex-col items-center rounded-[20px] border-[5px] border-Creme bg-Branco p-6 shadow-lg"
    >
      <h1 className="mb-4 text-center text-[32px] font-bold text-MarromEscuro">
        Deletar Conta
      </h1>

      <div className="mb-4 w-full">
        <label className="block text-[18px] font-bold text-MarromEscuro">
          Excluir por nome de Usuário:
        </label>
        <p>Selecione um Nome para Excluir:</p>
        <select
          className="my-2 w-full rounded border p-2"
          onChange={(e) => setUserName(e.target.value)}
          value={userName || ""}
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.name}>
              {usuario.name} (ID: {usuario.id})
            </option>
          ))}
        </select>
      </div>

      {/* Exibição de erro */}
      {erro && <p className="font-bold text-red-600">{erro}</p>}

      <div className="flex flex-row gap-4">
        <button
          type="submit"
          className="h-10 w-32 rounded-[20px] bg-red-700 px-4 py-2 text-[18px] font-bold text-white hover:bg-red-900 hover:text-orange-600"
        >
          Deletar
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/tabelaFunc")}
          className="h-10 w-32 rounded-[20px] bg-gray-500 px-4 py-2 text-[18px] font-bold text-white hover:bg-gray-700"
        >
          Cancelar
        </button>
      </div>

      {/* Mensagem de sucesso */}
      {sucesso && (
        <div className="mt-4 rounded bg-Verde px-4 py-2 text-[16px] font-bold text-white">
          Conta deletada com sucesso!
        </div>
      )}
    </form>
  );
}
