"use client";
import { useState } from "react";
import { api } from "~/utils/api";

const EditarUsuario = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Mutação para atualizar o usuário
  const updateMutation = api.auth.updateUser.useMutation({
    onSuccess: () => {
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    },
    onError: (error) => {
      setErro(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateMutation.mutate({
      id,
      nome,
      email,
      cargo,
      senha,
      imagem,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Editar Usuário</h1>

      <div>
        <label>ID do Usuário:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label>Cargo:</label>
        <select
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Selecione um cargo</option>
          <option value="Administrador">Administrador</option>
          <option value="Usuário">Usuário</option>
        </select>
      </div>

      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label>Imagem:</label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  setImagem(event.target.result as string);
                }
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full rounded border p-2"
        />
      </div>

      {erro && <p className="text-red-600">{erro}</p>}
      {sucesso && (
        <p className="text-green-600">Usuário atualizado com sucesso!</p>
      )}

      <button type="submit" className="rounded bg-Verde px-4 py-2 text-white">
        Atualizar
      </button>
    </form>
  );
};

export default EditarUsuario;
