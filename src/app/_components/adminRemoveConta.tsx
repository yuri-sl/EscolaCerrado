"use client";

import { useState, useEffect } from "react";
import { api } from "~/utils/api";

const DeleteUserComponent = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: users, refetch } = api.auth.getAllUsers.useQuery();
  const deleteUser = api.auth.deleteUser.useMutation({
    onSuccess: () => {
      alert("Usuário deletado com sucesso!");
      refetch();
    },
    onError: (error) => {
      alert(`Erro ao deletar usuário: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (!selectedUserId) {
      alert("Por favor, selecione um usuário para deletar.");
      return;
    }

    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUser.mutate({ id: selectedUserId });
    }
  };

  return (
    <div className="border-5 rounded-md border-solid border-black bg-white shadow-md">
      <h2 className="mb-4 text-xl font-bold">Deletar Usuário</h2>
      <select
        className="w-full rounded border p-2"
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId || ""}
      >
        <option value="">Selecione um usuário</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.nome} (ID: {user.id})
          </option>
        ))}
      </select>
      <button
        onClick={handleDelete}
        className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-800"
      >
        Deletar Usuário
      </button>
    </div>
  );
};

export default DeleteUserComponent;
