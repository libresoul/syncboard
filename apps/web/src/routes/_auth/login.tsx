import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../../components/auth/LoginForm'

export const Route = createFileRoute('/_auth/login')({
  component: LoginForm
})
