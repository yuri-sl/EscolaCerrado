"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarConta() {
  const router = useRouter();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [imagem, setImagem] = useState<string | null>("/user.png");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageURL = URL.createObjectURL(event.target.files[0]);
      setImagem(imageURL);
    }
  };

  return (
    <form className="flex flex-col items-center bg-white border-[14px] border-[#f5f4e8] rounded-[98px] p-8 shadow-lg w-[44rem]">
      <h1 className="text-[54px] font-bold text-[#3e300f] mb-4 text-center">Fazer Cadastro</h1>
      <img src={imagem} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-4" />
      <label className="bg-[#bfbe50] text-white py-2 px-4 rounded cursor-pointer mb-4 hover:bg-[#f5f261] hover:text-orange-600">
        Inserir imagem
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>
      <div className="w-full mb-2">
        <label className="block text-[#3e300f] font-bold">Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Insira seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px]"
        />
      </div>
      <div className="w-full mb-2">
        <label className="block text-[#3e300f] font-bold">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Insira seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px]"
        />
      </div>
      <div className="w-full mb-2">
        <label className="block text-[#3e300f] font-bold">Cargo:</label>
        <input
          type="text"
          name="cargo"
          placeholder="Defina seu cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px]"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-[#3e300f] font-bold">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder="Defina sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full bg-[#f5f4e8] p-2 rounded-[50px]"
        />
      </div>
      <button type="submit" className="bg-[#bfbe50] px-6 py-2 rounded-[51px] text-white font-bold text-[25px] w-40 h-12 hover:bg-[#f5f261] hover:text-orange-600">Criar Conta</button>
      <a href="#" onClick={() => router.push("/login")} className="text-[#a6551c] font-bold text-[18px] mt-4 hover:underline hover:text-orange-600">
        Já possui uma conta? Faça login
      </a>
    </form>
  );
}