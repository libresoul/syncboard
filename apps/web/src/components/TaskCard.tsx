import { useState } from 'react'
import type { Task } from '../types/task'

type TaskCardProps = {
  task: Task
  accentColor?: string
  onEditTask: (task: Task) => void
  onDelete: () => void
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
    <article className="relative bg-white border border-gray-200 p-3 rounded-lg shadow-sm group">
      <div className={`absolute top-0 left-0 h-0.5 w-full ${accentColor}`} />

      <div className="flex justify-between items-start mb-2">
        {task.tag ? (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-semibold">
            {task.tag}
          </span>
        ) : (
          <div />
        )}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <button
                className="w-full text-left text-gray-900 px-3 py-2 hover:bg-gray-100"
                onClick={() => handleEditTask()}
              >
                Edit
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                onClick={handleDeleteTask}
              >
                Delete
              </button>

              <button
                className="w-full text-left text-gray-900 px-3 py-2 hover:bg-gray-100"
                onClick={() => setShowMenu(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <h3
        className={`font-semibold text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p className="text-xs text-gray-500 mt-1">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
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
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[10px] font-semibold">
              {task.assignee}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
