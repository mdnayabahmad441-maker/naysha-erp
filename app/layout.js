import "./globals.css"
import Providers from "./providers"

export const metadata = {
  title: "NaySha ERP",
  description: "Smart School ERP Platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}