"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api"; // Cliente tRPC para chamadas de API

export default function CriarConta() {
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
        router.push("/login"); // Redireciona para login após sucesso
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
      className="flex flex-col items-center bg-Branco border-[14px] border-Creme rounded-[98px] p-8 shadow-lg w-[679px] h-[960px]"
    >
      <h1 className="text-[64px] font-bold text-MarromEscuro mb-4 text-center">
        Fazer Cadastro
      </h1>

      {/* Imagem do perfil */}
      <img
        src={imagem}
        alt="Foto de perfil"
        className="w-[200px] h-[200px] rounded-full mb-4 mt-4 object-cover"
      />

      {/* Input de upload de imagem */}
      <label className="bg-Verde text-white py-2 px-4 rounded-[51px] cursor-pointer mb-4 hover:bg-Amarelo hover:text-orange-600">
        Inserir imagem
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      {/* Campos do formulário */}
      <div className="w-full mb-2">
        <label className="block text-MarromEscuro font-bold text-[24px]">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-Creme p-2 rounded-[50px] text-[20px]"
          placeholder="Insira seu nome"
        />
      </div>

      <div className="w-full mb-2">
        <label className="block text-MarromEscuro font-bold text-[24px]">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-Creme p-2 rounded-[50px] text-[20px]"
          placeholder="Insira seu email"
        />
      </div>

      <div className="w-full mb-2">
        <label className="block text-MarromEscuro font-bold text-[24px]">Cargo:</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full bg-Creme p-2 rounded-[50px] text-[20px]"
          placeholder="Defina seu cargo"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-MarromEscuro font-bold text-[24px]">Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full bg-Creme p-2 rounded-[50px] text-[20px]"
          placeholder="Defina sua senha"
        />
      </div>

      {/* Exibição de erro */}
      {erro && <p className="text-red-600 font-bold">{erro}</p>}

      {/* Botão de envio */}
      <button
        type="submit"
        className="bg-Verde px-6 py-2 rounded-[51px] text-white font-bold text-[24px] w-40 h-12 hover:bg-Amarelo hover:text-orange-600"
      >
        Criar
      </button>

      {/* Mensagem de sucesso */}
      {sucesso && (
        <div className="bg-Verde text-white text-[20px] font-bold px-4 py-2 rounded mt-4">
          Conta criada com sucesso!
        </div>
      )}

      {/* Link para login */}
      <a
        href="#"
        onClick={() => router.push("/login")}
        className="text-Marrom font-bold text-[20px] mt-4 hover:underline hover:text-orange-600"
      >
        Já possui uma conta? Faça login
      </a>
    </form>
  );
}
