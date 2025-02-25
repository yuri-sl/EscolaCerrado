import "../styles/globals.css"; 

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
        </div>
      </body>
    </html>
  );
}
