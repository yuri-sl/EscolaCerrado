import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@email.com";
  const adminSenha = "admin123"; 
  const adminCargo = "Administrador"; 

  const adminExistente = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminExistente) {
    console.log("Criando Administrador...");

    const senhaCriptografada = bcrypt.hashSync(adminSenha, 10);

    const newAdmin = await prisma.user.create({
      data: {
        name: "Admin Padrão",
        email: adminEmail,
        senha: senhaCriptografada,
        role: "ADMIN",
        image: "/user2.png",
      },
    });

    await prisma.administrador.create({
      data: {
        userId: newAdmin.id,
        cargo: adminCargo,
        foto: "/user.png",
      },
    });

    console.log("Administrador criado com sucesso!");
  } else {
    console.log("Administrador já existe.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
