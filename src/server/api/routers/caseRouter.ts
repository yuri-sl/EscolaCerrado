import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const caseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cases = await ctx.db.case.findMany({
      include: { administrador: { include: { user: true } } },
    });
    return cases;
  }),

  create: publicProcedure
    .input(
      z.object({
        titulo: z.string(),
        descricao: z.string(),
        foto: z.string().optional(), // Foto em Base64
        administradorId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { titulo, descricao, foto, administradorId } = input;
      const newCase = await ctx.db.case.create({
        data: {
          titulo,
          descricao,
          foto, // Aqui você irá salvar a imagem em Base64 no banco
          administradorId,
        },
      });
      return { case: newCase };
    }),

  // Rota para deletar um "case" pelo título
  delete: publicProcedure
    .input(z.string()) // O input será o título do "case" a ser deletado
    .mutation(async ({ input, ctx }) => {
      const titulo = input;
      const deletedCase = await ctx.db.case.delete({
        where: {
          titulo: titulo, // Deleta o caso com o título fornecido
        },
      });
      return { deletedCase };
    }),
});
