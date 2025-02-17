"use client";
import { useState } from "react";
import "../../styles/loginBox.css";

export default function CriarConta() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className={"loginBox"}>
      <h1>Fazer Cadastro</h1>

      <h3>Nome:</h3>
      <div className="inputField">
        <input
          type="text"
          name="name"
          placeholder="insira seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <h3>Email:</h3>
      <div className="inputField">
        <input
          type="text"
          name="email"
          placeholder="insira seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <h3>Usuário:</h3>
      <div className="inputField">
        <input
          type="text"
          name="username"
          placeholder="defina seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <h3>Senha:</h3>
      <div className="inputField">
        <input
          type="text"
          name="password"
          placeholder="defina sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="SubmitButton">
        <button type="submit">Criar Conta</button>
      </div>
      <a>Já possui uma conta? Faça login</a>
    </form>
  );
}
