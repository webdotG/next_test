'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export default function MainTableLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  const isModal = usePathname().includes('/confirm')
  return (
    <>
      {children}
      {isModal ? modal : null}
    </>
  )
}
