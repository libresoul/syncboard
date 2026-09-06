import type { Task } from '@repo/shared'
import { useState } from 'react'

type TaskCardProps = {
  task: Task
  accentColor?: string
  onEditTask: (task: Task) => void
  onDelete: () => void
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts.at(-1)?.[0] ?? ''}`.toUpperCase()
}

export default function TaskCard({
  task,
  accentColor = 'bg-cyan-600',
  onEditTask,
  onDelete
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const handleEditTask = () => {
    onEditTask(task)
    setShowMenu(false)
  }

  const handleDeleteTask = () => {
    onDelete()
    setShowMenu(false)
  }

  return (
    <article className="relative rounded-lg border border-gray-200 bg-white p-3 shadow-sm group dark:border-slate-700 dark:bg-slate-900">
      <div className={`absolute top-0 left-0 h-0.5 w-full ${accentColor}`} />

      <div className="mb-2 flex items-start justify-between">
        {task.tag ? (
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold uppercase text-gray-600 dark:bg-slate-800 dark:text-slate-300">
            {task.tag}
          </span>
        ) : (
          <div />
        )}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 z-20 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <button
                className="w-full px-3 py-2 text-left text-gray-900 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={() => handleEditTask()}
              >
                Edit
              </button>

              <button
                className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-slate-800"
                onClick={handleDeleteTask}
              >
                Delete
              </button>

              <button
                className="w-full px-3 py-2 text-left text-gray-900 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={() => setShowMenu(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <h3
        className={`font-semibold text-sm ${task.status === 'done' ? 'line-through text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-slate-100'}`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          {task.comments !== undefined && (
            <span className="flex items-center gap-1">
              💬 <span className="font-mono">{task.comments}</span>
            </span>
          )}
          {task.attachments !== undefined && (
            <span className="flex items-center gap-1">
              📎 <span className="font-mono">{task.attachments}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {task.assignee ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-700 dark:bg-slate-700 dark:text-slate-200">
              {getInitials(task.assignee)}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
