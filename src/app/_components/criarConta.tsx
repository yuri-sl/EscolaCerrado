"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarConta() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState<string | null>("/user.png");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageURL = URL.createObjectURL(event.target.files[0]);
      setImagem(imageURL);
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
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white border-[14px] border-[#f5f4e8] rounded-[98px] p-8 shadow-lg w-[679px] h-[960px]">
      <h1 className="text-[64px] font-bold text-[#3e300f] mb-4 text-center">Fazer Cadastro</h1>
      
      <img src={imagem} alt="Foto de perfil" className="w-[176px] h-[157px] rounded-full mb-4 mt-4 object-cover" />
      
      <label className="bg-[#bfbe50] text-white py-2 px-4 rounded cursor-pointer mb-4 hover:bg-[#f5f261] hover:text-orange-600">
        Inserir imagem
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      <div className="w-full mb-2">
        <label className="block text-[#3e300f] font-bold text-[24px]">Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Insira seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px] text-[20px]"
        />
      </div>
      
      <div className="w-full mb-2">
        <label className="block text-[#3e300f] font-bold text-[24px]">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Insira seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px] text-[20px]"
        />
      </div>

      <div className="w-full mb-2">
        <label className="block text-[#3e300f] font-bold text-[24px]">Cargo:</label>
        <input
          type="text"
          name="cargo"
          placeholder="Defina seu cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px] text-[20px]"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-[#3e300f] font-bold text-[24px]">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder="Defina sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px] text-[20px]"
        />
      </div>

      {erro && <p className="text-red-600 font-bold">{erro}</p>}

      <button type="submit" className="bg-[#bfbe50] px-6 py-2 rounded-[51px] text-white font-bold text-[24px] w-40 h-12 hover:bg-[#f5f261] hover:text-orange-600">
        Criar
      </button>

      {sucesso && (
        <div className="bg-green-500 text-white text-[20px] font-bold px-4 py-2 rounded mt-4">
          Conta criada com sucesso!
        </div>
      )}

      <a href="#" onClick={() => router.push("/login")} className="text-[#a6551c] font-bold text-[20px] mt-4 hover:underline hover:text-orange-600">
        Já possui uma conta? Faça login
      </a>
    </form>
  );
}
