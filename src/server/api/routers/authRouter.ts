import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Pasta onde as imagens serão armazenadas localmente
const UPLOADS_DIR = path.join("public/uploads");

// Garante que a pasta de uploads exista
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export const authRouter = createTRPCRouter({
  // 🔹 Rota de Login
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        senha: z.string().min(6),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, senha } = input;

      // Busca o usuário pelo email
      const user = await ctx.db.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("E-mail ou senha incorretos.");
      }

      // Verifica a senha
      const senhaCorreta = bcrypt.compareSync(senha, user.senha);
      if (!senhaCorreta) {
        throw new Error("E-mail ou senha incorretos.");
      }

      return {
        message: "Login bem-sucedido!",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          image: user.image, // Retorna a imagem do usuário
        },
      };
    }),

  // 🔹 Rota de Cadastro
  signup: publicProcedure
    .input(
      z.object({
        nome: z.string(),
        email: z.string().email(),
        cargo: z.string(),
        senha: z.string().min(6),
        imagem: z.string().optional(), // Imagem recebida em Base64
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { nome, email, cargo, senha, imagem } = input;

      // Verifica se o e-mail já existe
      const userExistente = await ctx.db.user.findUnique({
        where: { email },
      });

      if (userExistente) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      // Criptografa a senha
      const senhaCriptografada = bcrypt.hashSync(senha, 10);

      let imagePath = "/user.png"; // Caminho padrão da imagem de perfil

      // Salva a imagem localmente se ela foi enviada
      if (imagem && imagem.startsWith("data:image")) {
        const base64Data = imagem.split(",")[1]; // Garante que estamos pegando apenas os dados
        if (!base64Data) {
          throw new Error("Imagem inválida.");
        }

        const buffer = Buffer.from(base64Data, "base64"); // Agora estamos seguros
        const filename = `${Date.now()}.png`;
        const filePath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(filePath, buffer);
        imagePath = `/uploads/${filename}`;
      }

      // Cria o usuário no banco de dados
      const user = await ctx.db.user.create({
        data: {
          name: nome,
          email,
          senha: senhaCriptografada,
          image: imagePath,
          role: cargo === "Administrador" ? "ADMIN" : "USER",
        },
      });

      // Criar relação com Administrador ou Funcionário
      if (cargo === "Administrador") {
        await ctx.db.administrador.create({
          data: {
            userId: user.id,
            cargo,
            foto: imagePath,
          },
        });
      } else {
        await ctx.db.funcionario.create({
          data: {
            userId: user.id,
            cargo,
            foto: imagePath,
          },
        });
      }

      return { message: "Conta criada com sucesso!", user };
    }),

  // 🔹 Rota para obter informações do usuário
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        select: { id: true, email: true, name: true, role: true, image: true },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      return user;
    }),
  deleteUser: publicProcedure
    .input(z.object({ id: z.string() })) // Agora recebemos o ID
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      // 🔹 Busca o usuário pelo ID
      const user = await ctx.db.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      // 🔹 Remover dependências antes de deletar o usuário
      await ctx.db.administrador.deleteMany({
        where: { userId: user.id },
      });

      await ctx.db.funcionario.deleteMany({
        where: { userId: user.id },
      });

      // 🔹 Agora podemos excluir o usuário
      await ctx.db.user.delete({
        where: { id: user.id },
      });

      return { message: `Usuário ${user.name} deletado com sucesso!` };
    }),
  // 🔹 Rota para obter todos os usuários
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        senha: true, // Cuidado ao retornar a senha!
      },
    });

    if (!users) {
      throw new Error("Nenhum usuário encontrado.");
    }

    // Mapeia os dados para o formato esperado na tabela
    return users.map((user) => ({
      id: user.id,
      nome: user.name,
      cargo: user.role === "ADMIN" ? "Administrador" : "Usuário",
      email: user.email,
      foto: user.image,
      senha: user.senha, // Cuidado ao retornar a senha!
    }));
  }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(), // ID do usuário a ser atualizado
        nome: z.string().optional(), // Novo nome (opcional)
        email: z.string().email().optional(), // Novo email (opcional)
        cargo: z.string().optional(), // Novo cargo (opcional)
        senha: z.string().min(6).optional(), // Nova senha (opcional)
        imagem: z.string().optional(), // Nova imagem (opcional)
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, nome, email, cargo, senha, imagem } = input;

      // Busca o usuário pelo ID
      const user = await ctx.db.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      let imagePath = user.image; // Mantém a imagem atual por padrão

      // Atualiza a imagem se uma nova for fornecida
      if (imagem && imagem.startsWith("data:image")) {
        const base64Data = imagem.split(",")[1]; // Extrai os dados da imagem
        if (!base64Data) {
          throw new Error("Imagem inválida.");
        }

        const buffer = Buffer.from(base64Data, "base64");
        const filename = `${Date.now()}.png`;
        const filePath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(filePath, buffer);
        imagePath = `/uploads/${filename}`;
      }

      // Atualiza os dados do usuário
      const updatedUser = await ctx.db.user.update({
        where: { id },
        data: {
          name: nome ?? user.name, // Mantém o nome atual se nenhum novo for fornecido
          email: email ?? user.email, // Mantém o email atual se nenhum novo for fornecido
          senha: senha ? bcrypt.hashSync(senha, 10) : user.senha, // Mantém a senha atual se nenhuma nova for fornecida
          image: imagePath, // Atualiza a imagem
          role: cargo === "Administrador" ? "ADMIN" : "USER", // Atualiza o cargo
        },
      });

      // Atualiza o cargo na tabela de Administrador ou Funcionário
      if (cargo) {
        if (cargo === "Administrador") {
          await ctx.db.administrador.upsert({
            where: { userId: id },
            update: { cargo },
            create: {
              userId: id,
              cargo,
              foto: imagePath,
            },
          });
        } else {
          await ctx.db.funcionario.upsert({
            where: { userId: id },
            update: { cargo },
            create: {
              userId: id,
              cargo,
              foto: imagePath,
            },
          });
        }
      }

      return {
        message: "Usuário atualizado com sucesso!",
        user: updatedUser,
      };
    }),
});
