import { useEffect, useState } from 'react'
import { Footer, Header, Sidebar } from '@/components'
import { Outlet } from 'react-router-dom'
import '@/styles/layout.css'

export function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenuOpen])

  return (
    <div
      className={`layout ${isSidebarCollapsed ? 'layout--sidebar-collapsed' : ''}`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        onCollapse={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />
      <div className="layout__body">
        <Header onMenuToggle={() => setIsMobileMenuOpen((open) => !open)} />
        <main className="layout__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
