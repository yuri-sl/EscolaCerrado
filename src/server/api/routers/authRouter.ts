import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt"; // 🔹 Adiciona bcrypt para proteger senhas

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      senha: z.string().min(6),
    }))
    .mutation(async ({ input, ctx }) => { 
      const { email, senha } = input;

      // Busca o usuário pelo email
      const user = await ctx.db.user.findUnique({
        where: { email },
      });

      // Verifica se o usuário existe
      if (!user) {
        throw new Error("E-mail ou senha incorretos.");
      }

      // 🔹 Compara a senha digitada com a senha criptografada
      const senhaCorreta = await bcrypt.compare(senha, user.senha);
      if (!senhaCorreta) {
        throw new Error("E-mail ou senha incorretos.");
      }

      return { message: "Login bem-sucedido!", user : {id : user.id, email: user.email, role: user.role}  };
    }),

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

      // 🔹 Verifica se o e-mail já existe para evitar duplicação
      const userExistente = await ctx.db.user.findUnique({
        where: { email },
      });

      if (userExistente) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      // 🔹 Criptografar a senha antes de salvar no banco
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Criar usuário no banco
      const user = await ctx.db.user.create({
        data: {
          name: nome,
          email,
          senha: senhaCriptografada, // ✅ Agora salva a senha criptografada
          image: imagem,
          role: cargo === "Administrador" ? "ADMIN" : "USER",
        },
      });

      // Criar relação com Administrador ou Funcionário
      if (cargo === "Administrador") {
        await ctx.db.administrador.create({
          data: {
            userId: user.id,
            cargo,
            foto: imagem,
          },
        });
      } else {
        await ctx.db.funcionario.create({
          data: {
            userId: user.id,
            cargo,
            foto: imagem,
          },
        });
      }

      return { message: "Conta criada com sucesso!", user };
    }),
});
