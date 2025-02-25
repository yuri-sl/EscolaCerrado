import { TRPCProvider } from "./_providers/trpc-provider"; // Importa o provider do tRPC
import "~/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
