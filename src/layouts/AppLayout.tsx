import { Footer, Header } from '@/components'
import { Outlet } from 'react-router-dom'
import '@/styles/layout.css'

export function AppLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
