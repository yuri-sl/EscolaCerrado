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
