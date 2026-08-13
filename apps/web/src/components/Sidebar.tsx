import { useState } from 'react'

const primaryItems = ['Overview', 'Projects', 'Boards', 'Calendar']

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPinnedOpen, setIsPinnedOpen] = useState(false)

  const isExpanded = isHovered || isPinnedOpen

  return (
    <aside
      className={`flex w-full flex-col overflow-hidden border-b border-slate-800/70 bg-slate-950/95 px-3 py-4 transition-all duration-300 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-3 ${
        isExpanded ? 'lg:w-65' : 'lg:w-19'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => setIsPinnedOpen((current) => !current)}
        aria-label={isPinnedOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/80 text-cyan-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7h14M5 12h14M5 17h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className={`mt-4 flex flex-1 flex-col gap-5 transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0 lg:hidden'}`}
      >
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[0_24px_80px_-32px_rgba(8,145,178,0.45)] backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            Syncboard
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
            Menu
          </h2>

          <div className="mt-4 space-y-2">
            {primaryItems.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-left text-sm transition-colors ${
                  index === 0
                    ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span>{item}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Soon
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {!isExpanded && (
        <div className="mt-4 hidden flex-1 flex-col items-center gap-3 lg:flex">
          <div className="flex flex-col items-center gap-2 rounded-3xl border border-slate-800/80 bg-slate-900/60 px-2 py-3">
            {primaryItems.map((item, index) => (
              <div
                key={item}
                className={`flex h-9 w-9 items-center justify-center rounded-2xl text-[10px] font-semibold ${
                  index === 0
                    ? 'bg-cyan-400/15 text-cyan-200'
                    : 'bg-slate-950/60 text-slate-400'
                }`}
              >
                {item.slice(0, 1)}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
