export const metadata = {
  title: "Masuro CMS",
  description: "Content Management System for Masuro",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}



