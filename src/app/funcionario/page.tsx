"use client";

import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import user2 from "../../../public/user2.png";
import FuncionarioHeaderComponent from "../_components/funcionarioComponents/FuncSimpleHeader";
import "../../styles/loginBox.css";

export default function AreaFuncionario() {
  const userId = localStorage.getItem("userId") ?? "";

  const { data: user, isLoading, isError } = api.auth.getUser.useQuery(
    { id: userId },
    { enabled: !!userId }
  );

  const updateUser = api.auth.updateUser.useMutation();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user2.src);

  useEffect(() => {
    if (user) {
      setNome(user.name ?? "");
      setPreview(user.image ? user.image : user2.src);
    }
  }, [user]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    let fotoBase64: string | undefined;

    if (foto) {
      fotoBase64 = await convertFileToBase64(foto);
    }

    updateUser.mutate(
      {
        id: userId,
        name: nome,
        senha: senha || undefined,
        foto: fotoBase64 || undefined,
      },
      {
        onSuccess: () => {
          alert("Dados atualizados com sucesso!");
          location.reload();
        },
        onError: (error) => {
          alert(`Erro ao atualizar: ${error.message}`);
        },
      }
    );
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados</p>;

  return (
    <div className="flex h-screen">
      {/* Barra lateral fixa */}
      <div className="fixed inset-y-0 left-0 w-64 bg-orange-600 text-white">
        <FuncionarioHeaderComponent title="Área do Funcionário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-10 ml-64 flex items-start mt-12">
        <section className="flex gap-10 w-full">
          {/* Coluna da foto de perfil */}
          <div className="w-1/3 flex flex-col items-center mt-10">
            <div
              className="w-64 h-64 overflow-hidden border-4 border-gray-300 shadow-lg"
              style={{ borderRadius: "20px" }} // AQUI muda para border-radius 20px
            >
              <img
                src={preview}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Estilizar input de file para esconder "Nenhuma imagem escolhida" */}
            <label
              htmlFor="uploadFoto"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Escolher Foto
            </label>
            <input
              id="uploadFoto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
          </div>

          {/* Coluna dos dados */}
          <div className="w-2/3">
            <div className="loginBox p-6 rounded-lg shadow-lg bg-white">
              <h1 id="titleDados" className="text-2xl font-bold mb-6">Meus dados</h1>

              <div className="inputField mb-4">
                <h3 className="font-semibold">Nome:</h3>
                <input
                  id="infoInput"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="inputField mb-4">
                <h3 className="font-semibold">Cargo:</h3>
                <input
                  id="infoInput"
                  value={user?.role === "ADMIN" ? "Administrador" : "Funcionário"}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="inputField mb-4">
                <h3 className="font-semibold">E-mail:</h3>
                <input
                  id="infoInput"
                  value={user?.email ?? ""}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="inputField mb-4">
                <h3 className="font-semibold">Nova Senha:</h3>
                <input
                  id="infoInput"
                  type="password"
                  value={senha}
                  placeholder="Deixe em branco para não alterar"
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Botão Azul Estilizado */}
              <div className="SubmitButton mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition"
                  style={{ borderRadius: "8px" }}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
