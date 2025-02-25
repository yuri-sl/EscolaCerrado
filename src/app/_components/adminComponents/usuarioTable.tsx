"use client";

import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
}

export default function UsuarioTable() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Usuários</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{usuario.id}</td>
              <td className="border px-4 py-2">{usuario.nome}</td>
              <td className="border px-4 py-2">{usuario.cargo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
