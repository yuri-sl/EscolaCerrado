"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import "../../styles/loginBox.css";

export default function CriarConta() {
  const router = useRouter(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="loginBox">
      <h1>Fazer Cadastro</h1>
      <h3>Nome:</h3>
      <div className="inputField">
        <input
          type="text"
          name="name"
          placeholder="Insira seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <h3>Email:</h3>
      <div className="inputField">
        <input
          type="text"
          name="email"
          placeholder="Insira seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <h3>Usuário:</h3>
      <div className="inputField">
        <input
          type="text"
          name="username"
          placeholder="Defina seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <h3>Senha:</h3>
      <div className="inputField">
        <input
          type="password"
          name="password"
          placeholder="Defina sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="SubmitButton">
        <button type="submit">Criar Conta</button>
      </div>
      <a href="#" onClick={() => router.push("/login")}>
        Já possui uma conta? Faça login
      </a>
    </form>
  );
}
