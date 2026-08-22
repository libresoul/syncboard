import { Link, useNavigate } from '@tanstack/react-router'
import { useActionState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiGithub, FiMail, FiUser } from 'react-icons/fi'
import { Route as loginRoute } from '../../routes/_auth/login'
import SocialAuthButton from './SocialAuthButton'

type SignUpState = {
  error?: string
}

const initialState: SignUpState = {}

export default function SignUpForm() {
  const navigate = useNavigate({ from: '/signup' })
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  )
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

    console.log('[signup] would submit:', { name, email })
    navigate({ to: '/login' })
    return {}
  }

  return (
    <div className="w-full max-w-md">
      <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-700 dark:text-cyan-200">
        Get started
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        Create your Syncboard account
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Set up your workspace in under a minute.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to={loginRoute.to}
          className="font-medium text-cyan-700 underline-offset-4 transition hover:underline dark:text-cyan-300"
        >
          Log in
        </Link>
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
            htmlFor="signup-name"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Full name
          </label>
          <div className="relative">
            <FiUser
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              size={16}
            />
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-500/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
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
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="user@domain.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-500/20"
            />
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

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
