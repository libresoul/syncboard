import AuthShell from '../auth/AuthShell'
import LoginForm from '../auth/LoginForm'

type LoginPageProps = {
  onSwitchToSignUp?: () => void
}

/**
 * Standalone page — not wired into routing yet since the project has
 * no router installed. `onSwitchToSignUp` lets whoever adds routing
 * later pass in e.g. `() => navigate('/signup')`.
 */
export default function LoginPage({ onSwitchToSignUp }: LoginPageProps) {
  return (
    <AuthShell>
      <LoginForm onSwitchToSignUp={onSwitchToSignUp} />
    </AuthShell>
  )
}
