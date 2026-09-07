import type { ReactNode } from 'react'
import '@/styles/pages.css'

interface PageShellProps {
  title: string
  description: string
  children?: ReactNode
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <header className="page-shell__header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </div>
  )
}
