import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/get-session'
import { Route as tasksRoute } from '@/routes/dashboard/tasks'
import SignUpForm from '../../components/auth/SignUpForm'

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad: async () => {
    const session = await getSession()
    if (session) {
      throw redirect({ to: tasksRoute.to })
    }
  },
  component: SignUpForm
})
