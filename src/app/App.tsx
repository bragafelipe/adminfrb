import { BrandProvider } from '@/features/brand'
import { AppLayout } from '@/layouts'
import { DashboardPage } from '@/pages/DashboardPage'

export function App() {
  return (
    <BrandProvider>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </BrandProvider>
  )
}
