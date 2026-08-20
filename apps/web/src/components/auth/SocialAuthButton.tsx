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
      className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
    >
      {icon}
      {label}
    </button>
  )
}
