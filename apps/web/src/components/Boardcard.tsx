import { LuEllipsis } from 'react-icons/lu'

type Board = { name: string; description: string; lists: number; tasks: number }

export default function Boardcard({ board }: { board: Board }) {
  return (
    <article className="group flex min-h-44 flex-col rounded-2xl border border-gray-300 bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">{board.name}</h2>
        <button
          aria-label={`Options for ${board.name}`}
          className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
        >
          <LuEllipsis className="size-4" />
        </button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{board.description}</p>
      <p className="mt-auto pt-6 text-xs text-muted-foreground">
        {board.lists} lists · {board.tasks} tasks
      </p>
    </article>
  )
}
