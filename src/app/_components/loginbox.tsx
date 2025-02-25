"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import "../../styles/loginBox.css";


export default function LoginBox() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Mutação do tRPC para fazer login
  const loginMutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      alert("Login bem-sucedido!");

      // 🔹 Verifica o cargo e redireciona para a página correta
      if (data.user.role === "ADMIN") {
        router.push("/admin-dashboard"); // Página do administrador
      } else {
        router.push("/funcionario-dashboard"); // Página do funcionário
      }
    },
    onError: (error) => {
      alert(error.message); // Exibe erro se houver falha no login
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
