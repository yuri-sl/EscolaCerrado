import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("userRole")?.value; // Obtém o cargo do cookie

  if (req.nextUrl.pathname.startsWith("/admin-dashboard") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url)); // Redireciona se não for ADMIN
  }

  if (req.nextUrl.pathname.startsWith("/funcionario-dashboard") && role !== "USER") {
    return NextResponse.redirect(new URL("/login", req.url)); // Redireciona se não for Funcionário
  }

  return NextResponse.next(); // Continua normalmente
}

export const config = {
  matcher: ["/admin-dashboard", "/funcionario-dashboard"], // Aplica o middleware nessas páginas
};
