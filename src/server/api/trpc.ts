import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/server/auth";
import { db } from "~/server/db";

/**
 * 1. CONTEXTO (Context)
 *
 * Este contexto é utilizado para acessar dados no backend, como sessão de usuário e banco de dados.
 */
export const createTRPCContext = async (opts: { req: Request }) => { // 🔹 Agora recebemos `req` corretamente
  const session = await auth();

  return {
    db,
    session,
    headers: opts.req.headers, // 🔹 Corrigido para capturar os headers corretamente
  };
};

/**
 * 2. INICIALIZAÇÃO DO TRPC (Initialization)
 *
 * Aqui inicializamos a API tRPC, conectando o contexto e configurando o transformer SuperJSON.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. CRIAÇÃO DOS ROUTERS E PROCEDURES (Routes & Procedures)
 *
 * Aqui criamos as rotas e procedimentos públicos e protegidos do tRPC.
 */

// Criar um router tRPC
export const createTRPCRouter = t.router;

// Middleware para medir o tempo de execução das requisições
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // Simula um pequeno delay no ambiente de desenvolvimento
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();
  const end = Date.now();

  console.log(`[tRPC] ${path} levou ${end - start}ms para executar`);

  return result;
});

/**
 * Procedimentos públicos (sem necessidade de autenticação)
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Procedimentos protegidos (requerem autenticação)
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
