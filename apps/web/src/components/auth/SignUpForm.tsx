import { useActionState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiGithub, FiMail, FiUser } from 'react-icons/fi'
import SocialAuthButton from './SocialAuthButton'

type SignUpState = {
  error?: string
}

const initialState: SignUpState = {}

/**
 * Same idea as loginAction: no backend to call yet, so this only
 * validates and logs. Swap for a real call (e.g. POST /api/auth/signup)
 * once the API exists.
 */
async function signUpAction(
  _prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const name = formData.get('name')
  const email = formData.get('email')

  if (typeof name !== 'string' || !name.trim()) {
    return { error: 'Enter your name to continue.' }
  }

  if (typeof email !== 'string' || !email.trim()) {
    return { error: 'Enter your email to continue.' }
  }

  // TODO: replace with a real call once POST /api/auth/signup exists.
  console.log('[signup] would submit:', { name, email })

  return {}
}

type SignUpFormProps = {
  onSwitchToLogin?: () => void
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  )

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-gray-900">Syncboard</h1>
      <p className="mt-1 text-gray-600">Create your account</p>
      <p className="mt-1 text-sm text-gray-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-blue-600 hover:underline"
        >
          Log in
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
            htmlFor="signup-name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <div className="relative">
            <FiUser
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
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
              id="signup-email"
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
