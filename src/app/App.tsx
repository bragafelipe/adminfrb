import { BrandProvider } from '@/features/brand'
import { AuthProvider } from '@/features/auth'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function App() {
  return (
    <BrandProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </BrandProvider>
  )
}
