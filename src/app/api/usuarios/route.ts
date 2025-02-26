import { prisma } from "~/app/api/lib/prisma";
import { NextResponse } from "next/server";

// Endpoint GET para buscar todos os usuários
export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

// Endpoint POST para adicionar um novo usuário
export async function POST(request: Request) {
  try {
    // Extrai os dados do corpo da requisição
    const body = await request.json();
    const { nome, cargo, email, foto, senha } = body;

    // Validação básica dos campos obrigatórios
    if (!nome || !cargo || !email) {
      return NextResponse.json(
        { error: "Campos 'nome', 'cargo' e 'email' são obrigatórios" },
        { status: 400 }
      );
    }

    // Cria um novo usuário no banco de dados
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        cargo,
        email, // O campo 'email' é único, então o Prisma lançará um erro se já existir
        foto: foto || "default.jpg", // Usa o valor padrão se 'foto' não for fornecido
        senha: senha || "senha_padrao", // Usa o valor padrão se 'senha' não for fornecido
      },
    });

    // Retorna o novo usuário criado
    return NextResponse.json(novoUsuario, { status: 201 });
  } catch (error) {
    // Trata erros (por exemplo, email duplicado ou problemas no banco de dados)
    return NextResponse.json(
      { error: "Erro ao criar usuário", details: error.message },
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
      return NextResponse.json({ error: "O ID do usuário é obrigatório" }, { status: 400 });
    }

    // Deletar usuário no banco de dados
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar usuário", details: error.message },
      { status: 400 }
    );
  }
}

// Endpoint PUT para editar um usuário pelo ID
export async function PUT(request: Request) {
  try {
    const { id, nome, cargo, email, senha, foto } = await request.json();

    // Validação para garantir que um ID foi fornecido
    if (!id) {
      return NextResponse.json({ error: "O ID do usuário é obrigatório" }, { status: 400 });
    }

    // Atualiza os dados do usuário no banco
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nome,
        cargo,
        email,
        senha: senha || "senha_padrao", // Mantém a senha anterior caso não seja alterada
        foto: foto || "default.jpg",
      },
    });

    return NextResponse.json(usuarioAtualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar usuário", details: error.message },
      { status: 400 }
    );
  }
}
