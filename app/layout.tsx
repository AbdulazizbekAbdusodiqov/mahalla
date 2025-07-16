import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mahalla Platform',
  description: 'Mahalla Platform - Mahalliy jamiyat uchun yagona platforma',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className="body">
        {children}
      </body>
    </html>
  )
}
