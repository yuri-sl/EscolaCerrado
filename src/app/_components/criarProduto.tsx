"use client";
import { useState } from "react";

export default function CriarProduto({
  onProdutoCriado,
}: {
  onProdutoCriado: () => void;
}) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco }),
    });
    if (res.ok) {
      setNome("");
      setPreco("");
      onProdutoCriado();
    } else {
      console.error("Erro ao criar produto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nome</h1>
      <input value={nome} onChange={(e) => setNome(e.target.value)} required />
      <h1>Preço</h1>
      <input
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <button type="submit">Criar Produto!</button>
    </form>
  );
}
