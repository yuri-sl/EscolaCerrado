import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany();
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 },
    );
  }
}

// Modificando a API para permitir a criação de produtos!
export async function POST(req: Request) {
  try {
    const { nome, preco } = await req.json();

    if (!nome || preco == null) {
      return NextResponse.json(
        { error: "Nome e preço são obrigatórios" },
        { status: 400 },
      );
    }

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        preco: parseFloat(preco), //Garantindo que estamos usando um float
      },
    });
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 },
    );
  }
}
