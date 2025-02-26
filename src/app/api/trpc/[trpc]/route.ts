import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const runtime = "nodejs"; 

export async function GET(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }), 
  });
}

export async function POST(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
  });
}
