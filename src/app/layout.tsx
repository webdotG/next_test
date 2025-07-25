import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'ТЕСТОВОЕ',
  description: 'куча фильтров',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <html lang='ru'>
      <body>{children}</body>
    </html>
  )
}
