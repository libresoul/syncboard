import type { ReactNode } from 'react'

type SocialAuthButtonProps = {
  provider: 'github' | 'google'
  icon: ReactNode
  label: string
  onClick?: () => void
}

/**
 * Purely presentational for now — no OAuth wiring, since there is no
 * backend to hand the flow off to yet. `onClick` is exposed so this
 * slots straight into the real flow once the API exists.
 */
export default function SocialAuthButton({
  provider,
  icon,
  label,
  onClick
}: SocialAuthButtonProps) {
  return (
    <button
      type="button"
      data-provider={provider}
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
    >
      {icon}
      {label}
    </button>
  )
}
