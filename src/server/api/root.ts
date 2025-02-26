import { createTRPCRouter } from './trpc'; 
import { authRouter } from './routers/authRouter';
import { caseRouter } from './routers/caseRouter';
import { funcionarioRouter } from "./routers/funcionarioRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  case: caseRouter,
  funcionario: funcionarioRouter,
});

export type AppRouter = typeof appRouter;