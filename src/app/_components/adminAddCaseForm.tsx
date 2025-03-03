"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

export default function AdminCriarCaso() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<string>("/default.jpg"); // Imagem padrão
  const [imagemBase64, setImagemBase64] = useState<string | undefined>();
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Mutação para criar caso via tRPC
  const createCaseMutation = api.case.create.useMutation({
    onSuccess: () => {
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        router.push("/admin/tabelaCasos");
      }, 3000);
    },
    onError: (error) => {
      setErro(error.message);
    },
  });

  // Função para lidar com o upload da imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagem(reader.result as string); // Atualiza a imagem no estado
        setImagemBase64(reader.result as string); // Converte para Base64
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!titulo || !descricao) {
      setErro("Preencha todos os campos!");
      return;
    }

    setErro("");

    // Envia os dados para o backend
    createCaseMutation.mutate({
      titulo,
      descricao,
      foto: imagemBase64, // Envia a imagem em Base64
      administradorId: 1, // Aqui você pode pegar o administrador logado
    });
  };

  return (
    <div className="flex h-[960px] w-[650px] items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Criar Caso
        </h1>

        {/* Exibição da imagem */}
        <div className="mb-4 flex justify-center">
          <img
            src={imagem}
            alt="Imagem do caso"
            className="h-48 w-48 rounded-full object-cover"
          />
        </div>

        {/* Input para o upload da imagem */}
        <label
          htmlFor="image-upload"
          className="mb-4 block cursor-pointer text-center text-blue-600"
        >
          Inserir imagem
          <input
            id="image-upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Campos do formulário */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Título:
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 p-3"
            placeholder="Insira o título"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Descrição:
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 p-3"
            placeholder="Descreva o caso"
          />
        </div>

        {/* Exibição de erro */}
        {erro && (
          <p className="text-center font-semibold text-red-600">{erro}</p>
        )}

        {/* Botões */}
        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="h-12 w-40 rounded-[51px] bg-Verde px-6 py-2 font-bold text-white hover:bg-Amarelo hover:text-orange-600"
          >
            Criar Caso
          </button>
        </div>

        {/* Mensagem de sucesso */}
        {sucesso && (
          <div className="mt-4 text-center font-semibold text-green-600">
            Caso criado com sucesso!
          </div>
        )}
      </form>
    </div>
  );
}
