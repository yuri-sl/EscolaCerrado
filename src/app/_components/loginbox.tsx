"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import "../../styles/loginBox.css";

export default function LoginBox() {
  const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (username === "admin" && password === "1234") {
      alert("Login bem-sucedido!");
      // Aqui você pode redirecionar para outra página
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <form className="loginBox" onSubmit={handleLogin}>
      <h1>Fazer Login</h1>
      <h3>Usuário</h3>
      <div className="inputField">
        <input
          type="text"
          name="username"
          placeholder="Digite seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <h3>Senha</h3>
      <div className="inputField">
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
