export default function GoteiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div>
          <div>
            Eu sou uma navbar diferenciada, pode confiar em mim que eu não vou
            matar vocês no futuro do capítulo 432
          </div>
          {children}

          <div>E eu sou um footer bem bacanudo</div>
        </div>
      </body>
    </html>
  );
}
