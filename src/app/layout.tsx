export default function GoteiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div>
          {children}

          <div>E eu sou um footer bem bacanudo</div>
        </div>
      </body>
    </html>
  );
}
