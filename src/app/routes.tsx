import {
  Navigate,
  Outlet,
  createBrowserRouter,
  type RouteObject,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { AppLayout } from '@/layouts'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { UsersPage } from '@/pages/UsersPage'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export const appRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
            handle: { permission: 'dashboard.view' },
          },
          {
            path: 'users',
            element: <UsersPage />,
            handle: { permission: 'users.view' },
          },
          {
            path: 'settings',
            element: <SettingsPage />,
            handle: { permission: 'settings.view' },
          },
        ],
      },
    ],
  },
  { path: 'login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(appRoutes)
