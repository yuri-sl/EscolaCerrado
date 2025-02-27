"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api"; // Cliente tRPC para chamadas de API

export default function AdminCriarConta() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState<string>("/user.png"); // Imagem padrão
  const [imagemBase64, setImagemBase64] = useState<string | undefined>();
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Mutação para criar conta via tRPC
  const signupMutation = api.auth.signup.useMutation({
    onSuccess: () => {
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        router.push("/admin/tabelaFunc"); // Redireciona para login após sucesso
      }, 3000);
    },
    onError: (error) => {
      setErro(error.message);
    },
  });

  // Converte a imagem para Base64 antes de enviá-la ao backend
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

  const validarEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nome || !email || !cargo || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }
    if (!validarEmail(email)) {
      setErro("Insira um e-mail válido!");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setErro("");

    // Envia os dados para o backend
    signupMutation.mutate({ nome, email, cargo, senha, imagem: imagemBase64 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[960px] w-[679px] flex-col items-center rounded-[98px] border-[14px] border-Creme bg-Branco p-8 shadow-lg"
    >
      <h1 className="mb-4 text-center text-[64px] font-bold text-MarromEscuro">
        Fazer Cadastro
      </h1>

      {/* Imagem do perfil */}
      <img
        src={imagem}
        alt="Foto de perfil"
        className="mb-4 mt-4 h-[200px] w-[200px] rounded-full object-cover"
      />

      {/* Input de upload de imagem */}
      <label className="mb-4 cursor-pointer rounded-[51px] bg-Verde px-4 py-2 text-white hover:bg-Amarelo hover:text-orange-600">
        Inserir imagem
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      {/* Campos do formulário */}
      <div className="mb-2 w-full">
        <label className="block text-[24px] font-bold text-MarromEscuro">
          Nome:
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded-[50px] bg-Creme p-2 text-[20px]"
          placeholder="Insira seu nome"
        />
      </div>

      <div className="mb-2 w-full">
        <label className="block text-[24px] font-bold text-MarromEscuro">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[50px] bg-Creme p-2 text-[20px]"
          placeholder="Insira seu email"
        />
      </div>

      <div className="mb-2 w-full">
        <label className="block text-[24px] font-bold text-MarromEscuro">
          Cargo:
        </label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full rounded-[50px] bg-Creme p-2 text-[20px]"
          placeholder="Defina seu cargo"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-[24px] font-bold text-MarromEscuro">
          Senha:
        </label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full rounded-[50px] bg-Creme p-2 text-[20px]"
          placeholder="Defina sua senha"
        />
      </div>

      {/* Exibição de erro */}
      {erro && <p className="font-bold text-red-600">{erro}</p>}

      <div className="flex flex-row">
        {/* Botão de envio */}
        <button
          type="submit"
          className="h-12 w-40 rounded-[51px] bg-Verde px-6 py-2 text-[24px] font-bold text-white hover:bg-Amarelo hover:text-orange-600"
        >
          Criar
        </button>
        <button className="h-12 w-40 rounded-[51px] bg-red-700 px-6 py-2 text-[24px] font-bold text-white hover:bg-red-900 hover:text-orange-600">
          Cancelar
        </button>
      </div>

      {/* Mensagem de sucesso */}
      {sucesso && (
        <div className="mt-4 rounded bg-Verde px-4 py-2 text-[20px] font-bold text-white">
          Conta criada com sucesso!
        </div>
      )}
    </form>
  );
}
