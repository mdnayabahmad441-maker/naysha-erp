import "./globals.css";

export const metadata = {
  title: "NaySha ERP",
  description: "Smart School ERP Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}