import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from "../trpc";

export const caseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => { 
    const cases = await ctx.db.case.findMany({
      include: { administrador: { include: { user: true } } }, // 🔹 Agora inclui o nome do administrador
    });
    return cases;
  }),

  create: publicProcedure
    .input(z.object({
      titulo: z.string(),
      descricao: z.string(),
      foto: z.string().optional(),
      administradorId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => { 
      const { titulo, descricao, foto, administradorId } = input;
      const newCase = await ctx.db.case.create({
        data: {
          titulo,
          descricao,
          foto,
          administradorId,
        },
      });
      return { case: newCase };
    }),
});
