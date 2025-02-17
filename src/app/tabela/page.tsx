"use client";
import { useEffect, useState } from "react";
import CriarProduto from "../_components/criarProduto";

type Produto = {
  id: number;
  nome: string;
  preco: number;
};

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = async () => {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
    const interval = setInterval(fetchProdutos, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <CriarProduto onProdutoCriado={fetchProdutos} />
      <h1>Lista de Produtos</h1>
      <button onClick={fetchProdutos}>Atualizar Lista</button>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
