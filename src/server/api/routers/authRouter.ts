import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
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

      if (!user || user.senha !== senha) {
        throw new Error('Credenciais inválidas');
      }

      return { user };
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
      const user = await ctx.db.user.create({
        data: {
          name: nome,
          email,
          senha,
          image: imagem,
          role: cargo === 'Administrador' ? 'ADMIN' : 'USER',
        },
      });

      if (cargo === 'Administrador') {
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

      return { user };
    }),
});