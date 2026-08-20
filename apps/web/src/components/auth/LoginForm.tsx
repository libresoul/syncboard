import { useActionState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiGithub, FiMail } from 'react-icons/fi'
import SocialAuthButton from './SocialAuthButton'

type LoginState = {
  error?: string
}

const initialState: LoginState = {}

/**
 * Form action for React 19's uncontrolled <form action={...}> pattern.
 * There is no backend yet, so this only validates and logs what would
 * be sent. Swap the body of this function for a real API call
 * (e.g. POST /api/auth/login) once the API exists — the form itself
 * won't need to change.
 */
async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email')

  if (typeof email !== 'string' || !email.trim()) {
    return { error: 'Enter your email to continue.' }
  }

  // TODO: replace with a real call once POST /api/auth/login exists.
  console.log('[login] would submit:', { email })

  return {}
}

type LoginFormProps = {
  onSwitchToSignUp?: () => void
}

export default function LoginForm({ onSwitchToSignUp }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  )

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-gray-900">Syncboard</h1>
      <p className="mt-1 text-gray-600">Log in to your account</p>
      <p className="mt-1 text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <SocialAuthButton
          provider="github"
          icon={<FiGithub size={18} />}
          label="GitHub"
        />
        <SocialAuthButton
          provider="google"
          icon={<FcGoogle size={18} />}
          label="Google"
        />
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        or continue with email
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <form action={formAction} className="space-y-4" noValidate>
        <div>
          <label
            htmlFor="login-email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <FiMail
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="user@domain.com"
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Continuing…' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
