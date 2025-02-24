import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados antes de inserir os dados
  await prisma.case.deleteMany();
  await prisma.administrador.deleteMany();
  await prisma.funcionario.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("senhaSegura123", 10);

  // Criando um Administrador
  const admin = await prisma.user.create({
    data: {
      name: "Admin Teste",
      email: "admin@email.com",
      senha: hashedPassword,
      role: "ADMIN",
      image: "link-da-imagem",
      administrador: {
        create: {
          cargo: "Diretor",
          foto: "link-da-imagem"
        }
      }
    },
    include: {
      administrador: true // Inclui a relação `administrador` no resultado
    }
  });

  console.log("Administrador criado:", admin);

  // Criando um Funcionário
  const funcionario = await prisma.user.create({
    data: {
      name: "Funcionario Teste",
      email: "funcionario@email.com",
      senha: hashedPassword,
      role: "FUNCIONARIO",
      image: "link-da-imagem",
      funcionario: {
        create: {
          cargo: "Professor",
          foto: "link-da-imagem"
        }
      }
    }
  });

  console.log("Funcionário criado:", funcionario);

  // Criando um Case associado ao Administrador
  const caso = await prisma.case.create({
    data: {
      titulo: "Caso de Exemplo",
      descricao: "Este é um caso de exemplo criado pelo seed.",
      foto: "link-da-imagem-do-caso",
      administrador: {
        connect: {
          id: admin.administrador?.id // Conecta o Case ao Administrador criado
        }
      }
    }
  });

  console.log("Case criado:", caso);
}

// Executar a seed
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });