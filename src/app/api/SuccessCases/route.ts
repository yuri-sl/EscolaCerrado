import { prisma } from "~/app/api/lib/prisma";
import { NextResponse } from "next/server";

// Endpoint GET para buscar todos os usuários
export async function GET() {
  const cases = await prisma.success_Cases.findMany();
  return NextResponse.json(cases);
}

// Endpoint POST para adicionar um novo usuário
export async function POST(request: Request) {
  try {
    // Extrai os dados do corpo da requisição
    const body = await request.json();
    const { titulo, descricao, foto} = body;

    // Validação básica dos campos obrigatórios
    if (!titulo || !descricao || !foto) {
      return NextResponse.json(
        { error: "Campos 'nome', 'cargo' e 'email' são obrigatórios" },
        { status: 400 }
      );
    }

    // Cria um novo usuário no banco de dados
    const novoCase = await prisma.success_Cases.create({
      data: {
        titulo,
        descricao,
        foto, // O campo 'email' é único, então o Prisma lançará um erro se já existir
      },
    });

    // Retorna o novo usuário criado
    return NextResponse.json(novoCase, { status: 201 });
  } catch (error) {
    // Trata erros (por exemplo, email duplicado ou problemas no banco de dados)
    return NextResponse.json(
      { error: "Erro ao criar case", details: error.message },
      { status: 400 }
    );
  }
}

// Endpoint DELETE para remover um usuário pelo ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Validação para garantir que um ID foi fornecido
    if (!id) {
      return NextResponse.json({ error: "O ID do case é obrigatório" }, { status: 400 });
    }

    // Deletar usuário no banco de dados
    await prisma.success_Cases.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Case deletado com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar case", details: error.message },
      { status: 400 }
    );
  }
}

// Endpoint PUT para editar um usuário pelo ID
export async function PUT(request: Request) {
  try {
    const { id, titulo, descricao, foto} = await request.json();

    // Validação para garantir que um ID foi fornecido
    if (!id) {
      return NextResponse.json({ error: "O ID do case é obrigatório" }, { status: 400 });
    }

    // Atualiza os dados do usuário no banco
    const caseAtualizado = await prisma.success_Cases.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        foto,
      },
    });

    return NextResponse.json(caseAtualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar case", details: error.message },
      { status: 400 }
    );
  }
}
