import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/get-session'
import { Route as loginRoute } from '@/routes/_auth/login'
import { DashboardLayout } from '../../layouts/DashboardLayout'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()
    if (!session) {
      throw redirect({ to: loginRoute.to, search: { redirect: location.href } })
    }
    return { session }
  },
  component: DashboardLayout
})
