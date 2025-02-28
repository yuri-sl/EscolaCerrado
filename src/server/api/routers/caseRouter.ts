import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { api } from "~/utils/api";

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
    .input(z.string()) // Agora recebe um título
    .mutation(async ({ input, ctx }) => {
      const titulo = input;

      const deletedCase = await ctx.db.case.deleteMany({
        // Usa deleteMany para evitar erro se houver mais de um com o mesmo título
        where: { titulo },
      });

      if (deletedCase.count === 0) {
        throw new Error("Case não encontrado.");
      }

      return { message: `Case '${titulo}' deletado com sucesso!` };
    }),
  updateCase: publicProcedure
    .input(
      z.object({
        id: z.string(),
        titulo: z.string(),
        descricao: z.string(),
        foto: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.case.update({
        // <-- Corrigindo para ctx.db
        where: { id: input.id },
        data: {
          titulo: input.titulo,
          descricao: input.descricao,
          foto: input.foto,
        },
      });
    }),
});
