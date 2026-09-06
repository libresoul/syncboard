import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import LoginForm from '@/components/auth/LoginForm'
import { getSession } from '@/lib/get-session'
import { Route as tasksRoute } from '@/routes/dashboard/tasks'

export const Route = createFileRoute('/_auth/login')({
  beforeLoad: async () => {
    const session = await getSession()
    if (session) {
      throw redirect({ to: tasksRoute.to })
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional()
  }),
  component: LoginForm
})
