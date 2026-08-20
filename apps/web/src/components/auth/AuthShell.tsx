import type { ReactNode } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../../hooks/useTheme'

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
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_86%_82%,rgba(14,165,233,0.13),transparent_45%)] dark:bg-[radial-gradient(circle_at_14%_18%,rgba(34,211,238,0.14),transparent_38%),radial-gradient(circle_at_86%_82%,rgba(14,165,233,0.12),transparent_44%)]" />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition-colors hover:border-cyan-400/40 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {isDark ? (
          <LuSun className="h-4.5 w-4.5 text-amber-400" />
        ) : (
          <LuMoon className="h-4.5 w-4.5" />
        )}
      </button>

      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-[0_40px_100px_-48px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/95">
        <div className="hidden w-[52%] flex-col justify-between border-r border-slate-200/90 bg-slate-50/80 p-10 dark:border-slate-800/80 dark:bg-slate-900/80 md:flex">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
              Team collaboration
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Ship projects faster with Syncboard
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Bring planning, execution, and team updates into one focused
              workspace built for modern product teams.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_35px_-30px_rgba(8,145,178,0.7)] dark:border-slate-800 dark:bg-slate-950/70"
              >
                <FiCheckCircle
                  className="mb-2 text-cyan-600 dark:text-cyan-300"
                  size={18}
                />
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {feature.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center p-7 sm:p-8 md:w-[48%] md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(6,182,212,0.07),transparent_30%)] dark:bg-[linear-gradient(140deg,rgba(8,145,178,0.14),transparent_30%)]" />
          {children}
        </div>
      </div>
    </div>
  )
}
