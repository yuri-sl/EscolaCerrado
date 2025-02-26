import { createTRPCRouter, publicProcedure } from "../trpc";

export const funcionarioRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => { 
    const funcionarios = await ctx.db.funcionario.findMany({
      include: { user: true }, 
    });
    return funcionarios;
  }),
});
