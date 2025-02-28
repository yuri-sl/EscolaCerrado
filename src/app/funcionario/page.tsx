"use client";

import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import user2 from "../../../public/user2.png";
import FuncionarioHeaderComponent from "../_components/funcionarioComponents/FuncSimpleHeader";

export default function AreaFuncionario() {
  const userId = localStorage.getItem("userId") ?? "";

  const { data: user, isLoading, isError } = api.auth.getUser.useQuery(
    { id: userId },
    { enabled: !!userId }
  );

  const updateUser = api.auth.updateUser.useMutation();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user2.src);

  useEffect(() => {
    if (user) {
      setNome(user.name ?? "");
      setCargo(user.cargo ?? "");
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

      {/* Conteúdo principal ajustado */}
      <div className="flex-1 flex justify-center items-start ml-64 pt-10"> 
        <section className="flex flex-col md:flex-row gap-x-28 w-full max-w-7xl items-start mt-6">
          <div className="flex flex-col items-center md:mt-4 self-center mt-[calc(50%-14rem)]">
            <div className="w-72 h-72 md:w-[28rem] md:h-[28rem] overflow-hidden border-4 border-gray-300 shadow-lg rounded-[20px] flex items-center justify-center bg-white">
              <img
                src={preview}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>

            <label
              htmlFor="uploadFoto"
              className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
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

          {/* Coluna dos dados (LoginBox) */}
          <div className="flex-1">
            <div className="bg-white border-[14px] border-[#f5f4e8] rounded-[98px] shadow-lg p-8 w-full max-w-4xl min-h-[32rem] flex flex-col justify-center relative">
              <h1 className="text-[#3e300f] text-6xl font-bold text-center mb-6">
                Meus dados
              </h1>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#3e300f] text-3xl font-bold">Nome:</h3>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#f5f4e8] p-3 rounded-full text-xl focus:outline-none"
                  />
                </div>
                <div>
                  <h3 className="text-[#3e300f] text-3xl font-bold">Cargo:</h3>
                  <input
                    value={cargo}
                    readOnly
                    className="w-full bg-[#f5f4e8] p-3 rounded-full text-xl focus:outline-none"
                  />
                </div>
                <div>
                  <h3 className="text-[#3e300f] text-3xl font-bold">Email:</h3>
                  <input
                    value={user?.email ?? ""}
                    readOnly
                    className="w-full bg-[#f5f4e8] p-3 rounded-full text-xl focus:outline-none"
                  />
                </div>
                <div>
                  <h3 className="text-[#3e300f] text-3xl font-bold">Nova Senha:</h3>
                  <input
                    type="password"
                    value={senha}
                    placeholder="Deixe em branco para não alterar"
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full bg-[#f5f4e8] p-3 rounded-full text-xl focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#bfbe50] text-[#3e300f] font-bold py-3 px-8 rounded-full text-2xl hover:bg-[#f5f261] hover:text-orange-500 transition"
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
