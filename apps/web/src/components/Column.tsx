import type { ReactNode } from 'react'

type ColumnProps = {
  title: string
  showCreate?: boolean
  onCreate?: () => void
  children: ReactNode[]
}

export default function Column({
  title,
  showCreate = false,
  onCreate,
  children
}: ColumnProps) {
  return (
    <section className="w-[320px] shrink-0 rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900 flex flex-col max-h-full">
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-slate-100">
          {title}
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600 dark:bg-slate-800 dark:text-slate-300">
            {children.length}
          </span>
        </h3>

        <button className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200">
          ⋯
        </button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3">
        {showCreate && (
          <button
            onClick={onCreate}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-1"
          >
            <span className="text-sm">＋</span>
            Create Task
          </button>
        )}

        <div className="space-y-3">{children}</div>
      </div>
    </section>
  )
}
