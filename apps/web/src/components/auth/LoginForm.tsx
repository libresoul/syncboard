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
    <div className="w-full max-w-md">
      <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-700 dark:text-cyan-200">
        Welcome back
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        Log in to Syncboard
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Continue where your team left off.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-medium text-cyan-700 underline-offset-4 transition hover:underline dark:text-cyan-300"
        >
          Sign up
        </button>
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3">
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

      <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        or continue with email
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <form action={formAction} className="space-y-4" noValidate>
        <div>
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Email
          </label>
          <div className="relative">
            <FiMail
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              size={16}
            />
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="user@domain.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-500/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-600 dark:bg-slate-900"
            />
            Keep me signed in
          </label>
          <button
            type="button"
            className="text-cyan-700 underline-offset-4 transition hover:underline dark:text-cyan-300"
          >
            Forgot email?
          </button>
        </div>

        {state.error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-cyan-600 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Continuing…' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
