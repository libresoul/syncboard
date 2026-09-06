import { createFileRoute, redirect } from '@tanstack/react-router'
import SignUpForm from '@/components/auth/SignUpForm'
import { getSession } from '@/lib/get-session'
import { Route as workspacesRoute } from '@/routes/dashboard/workspaces'

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad: async () => {
    const session = await getSession()
    if (session) {
      throw redirect({ to: workspacesRoute.to })
    }
  },
  component: SignUpForm
})
