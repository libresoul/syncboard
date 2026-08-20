import type { ReactNode } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

type Feature = {
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    title: 'Live boards',
    description: 'Watch teammates move cards as it happens.'
  },
  {
    title: 'Stays in sync',
    description: 'Changes sync across every connected device.'
  },
  {
    title: 'Built for teams',
    description: 'Organize work across boards and columns.'
  },
  {
    title: 'Works offline',
    description: 'Keep working through a dropped connection.'
  }
]

type AuthShellProps = {
  children: ReactNode
}

/**
 * Split-screen shell shared by the Login and Sign Up pages.
 * Left: platform feature overview panel (hidden on small screens).
 * Right: slot for the actual auth form.
 */
export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden w-1/2 flex-col justify-center bg-gray-50 p-10 md:flex">
          <span className="mb-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Platform features &amp; overview
          </span>

          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-gray-200 bg-white p-3"
              >
                <FiCheckCircle className="mb-2 text-cyan-600" size={18} />
                <p className="text-sm font-semibold text-gray-900">
                  {feature.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}
