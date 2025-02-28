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
    .input(z.object({
      email: z.string().email(),
      senha: z.string().min(6),
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, senha } = input;

      const user = await ctx.db.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("E-mail ou senha incorretos.");
      }

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
          image: user.image,
        },
      };
    }),

  // 🔹 Rota de Cadastro
  signup: publicProcedure
    .input(z.object({
      nome: z.string(),
      email: z.string().email(),
      cargo: z.string(),
      senha: z.string().min(6),
      imagem: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { nome, email, cargo, senha, imagem } = input;

      const userExistente = await ctx.db.user.findUnique({
        where: { email },
      });

      if (userExistente) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      const senhaCriptografada = bcrypt.hashSync(senha, 10);

      let imagePath = "/user.png";

      if (imagem && imagem.startsWith("data:image")) {
        const base64Data = imagem.split(",")[1];
        if (!base64Data) {
          throw new Error("Imagem inválida.");
        }

        const buffer = Buffer.from(base64Data, "base64");
        const filename = `${Date.now()}.png`;
        const filePath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(filePath, buffer);
        imagePath = `/uploads/${filename}`;
      }

      const user = await ctx.db.user.create({
        data: {
          name: nome,
          email,
          senha: senhaCriptografada,
          image: imagePath,
          role: cargo === "Administrador" ? "ADMIN" : "USER",
        },
      });

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
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      return user;
    }),

  // 🔹 Rota para atualizar informações do usuário (nome, senha, foto)
  updateUser: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      senha: z.string().optional(),
      foto: z.string().optional(), // Base64 opcional para foto
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, name, senha, foto } = input;

      const updateData: any = { name };

      if (senha) {
        updateData.senha = bcrypt.hashSync(senha, 10);
      }

      if (foto && foto.startsWith("data:image")) {
        const base64Data = foto.split(",")[1];
        if (base64Data) {
          const buffer = Buffer.from(base64Data, "base64");
          const filename = `${Date.now()}.png`;
          const filePath = path.join(UPLOADS_DIR, filename);

          fs.writeFileSync(filePath, buffer);
          updateData.image = `/uploads/${filename}`;
        }
      }

      const updatedUser = await ctx.db.user.update({
        where: { id },
        data: updateData,
      });

      return {
        message: "Dados atualizados com sucesso!",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          image: updatedUser.image,
        },
      };
    }),
});
