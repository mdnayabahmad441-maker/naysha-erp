import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-blue-950 to-purple-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}