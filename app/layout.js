"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "NaySha ERP",
  description: "Smart School ERP Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}