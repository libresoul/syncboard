import AuthShell from '../auth/AuthShell'
import SignUpForm from '../auth/SignUpForm'

type SignUpPageProps = {
  onSwitchToLogin?: () => void
}

/**
 * Standalone page — not wired into routing yet since the project has
 * no router installed. `onSwitchToLogin` lets whoever adds routing
 * later pass in e.g. `() => navigate('/login')`.
 */
export default function SignUpPage({ onSwitchToLogin }: SignUpPageProps) {
  return (
    <AuthShell>
      <SignUpForm onSwitchToLogin={onSwitchToLogin} />
    </AuthShell>
  )
}
