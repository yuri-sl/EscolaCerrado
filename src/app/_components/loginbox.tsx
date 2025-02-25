"use client"; // 🚨 Isso é obrigatório para Next.js App Router!

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api"; // Importe o cliente tRPC
import "../../styles/loginBox.css";

export default function LoginBox() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Use a mutação do tRPC para fazer login
  const loginMutation = api.auth.login.useMutation({
    onSuccess: () => {
      alert("Login bem-sucedido!");
      router.push("/dashboard"); // Redireciona para a página de dashboard após o login
    },
    onError: (error) => {
      alert(error.message); // Exibe o erro retornado pelo back-end
    },
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação dos campos
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    // Chama a mutação do tRPC para fazer login
    loginMutation.mutate({ email, senha });
  };

  return (
    <form className="loginBox" onSubmit={handleLogin}>
      <h1>Fazer Login</h1>
      <h3>Email:</h3>
      <div className="inputField">
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <h3>Senha:</h3>
      <div className="inputField">
        <input
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div className="SubmitButton">
        <button type="submit">Entrar</button>
      </div>
      <a href="#" onClick={() => router.push("/criarconta")}>
        Ainda não tem uma conta? Cadastre-se
      </a>
    </form>
  );
}
