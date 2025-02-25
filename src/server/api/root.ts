import { createTRPCRouter } from './trpc'; 
import { authRouter } from './routers/authRouter';
import { caseRouter } from './routers/caseRouter';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  case: caseRouter,
});

export type AppRouter = typeof appRouter;