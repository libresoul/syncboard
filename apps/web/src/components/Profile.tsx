import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { LuChevronUp, LuLogOut, LuUser } from 'react-icons/lu'
import { signOut, useSession } from '@/lib/auth-client'
import { Route as loginRoute } from '@/routes/_auth/login'

type ProfileProps = {
  isExpanded: boolean
}

export default function Profile({ isExpanded }: ProfileProps) {
  const navigate = useNavigate()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const userName = session?.user.name || session?.user.email || 'Profile'
  const userInitial = userName.slice(0, 1).toUpperCase()

  useEffect(() => {
    if (!isExpanded) {
      setIsOpen(false)
    }
  }, [isExpanded])

  async function handleSignOut() {
    setError(null)
    const { error: signOutError } = await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: loginRoute.to, replace: true })
        }
      }
    })

    if (signOutError) {
      setError(signOutError.message ?? 'Unable to log out. Please try again.')
      return
    }

    localStorage.removeItem('bearer_token')
    navigate({ to: loginRoute.to, replace: true })
  }

  return (
    <div className="relative mt-4">
      {isOpen && (
        <div className="absolute bottom-full left-0 z-20 mb-2 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
          <div className="border-b border-gray-200 px-3 py-2.5 dark:border-slate-800">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
              {userName}
            </p>
            {session?.user.email && (
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {session.user.email}
              </p>
            )}
          </div>

          {error && (
            <p className="px-3 py-2 text-xs text-red-600 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
          >
            <LuLogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close profile menu' : 'Open profile menu'}
        className={`flex items-center rounded-2xl border border-gray-200 bg-gray-50 p-2.5 text-left transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 dark:border-slate-800/80 dark:bg-slate-900/60 ${
          isExpanded ? 'w-full gap-3' : 'h-12 w-12 justify-center'
        }`}
      >
        {session?.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-semibold text-cyan-700 dark:text-cyan-200">
            {session ? userInitial : <LuUser className="h-4 w-4" />}
          </span>
        )}

        {isExpanded && (
          <>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800 dark:text-slate-200">
              {userName}
            </span>
            <LuChevronUp
              className={`h-4 w-4 text-slate-400 transition-transform ${
                isOpen ? '' : 'rotate-180'
              }`}
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </div>
  )
}
