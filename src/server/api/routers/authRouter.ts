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

  // 🔹 Login
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

      if (!user) throw new Error("E-mail ou senha incorretos.");

      const senhaCorreta = bcrypt.compareSync(senha, user.senha);
      if (!senhaCorreta) throw new Error("E-mail ou senha incorretos.");

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

  // 🔹 Cadastro
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

      let imagePath = "/user.png"; // Imagem padrão

      if (imagem && imagem.startsWith("data:image")) {
        const base64Data = imagem.split(",")[1];
        if (base64Data) {
          const buffer = Buffer.from(base64Data, "base64");
          const filename = `${Date.now()}.png`;
          const filePath = path.join(UPLOADS_DIR, filename);
          fs.writeFileSync(filePath, buffer);
          imagePath = `/uploads/${filename}`;
        }
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

  // 🔹 Obter dados do usuário
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          funcionario: true,
          administrador: true,
        },
      });

      if (!user) throw new Error("Usuário não encontrado.");

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        cargo: user.funcionario?.cargo ?? user.administrador?.cargo ?? "",
      };
    }),

  // 🔹 Atualizar dados do usuário (nome, email, cargo, senha, foto)
  updateUser: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      cargo: z.string(),
      senha: z.string().optional(),
      foto: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, name, email, cargo, senha, foto } = input;

      const updateData: any = { name, email };

      if (senha) {
        updateData.senha = bcrypt.hashSync(senha, 10);
      }

      if (foto && foto.startsWith("data:image")) {
        const base64Data = foto.split(",")[1];
        if (base64Data) {  // 🔹 Evita erro com Buffer.from(undefined)
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

      if (updatedUser.role === "ADMIN") {
        await ctx.db.administrador.update({
          where: { userId: id },
          data: { cargo },
        });
      } else {
        await ctx.db.funcionario.update({
          where: { userId: id },
          data: { cargo },
        });
      }

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
