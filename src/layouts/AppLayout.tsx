import type { ReactNode } from 'react'
import { Footer, Header } from '@/components'
import '@/styles/layout.css'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  )
}
