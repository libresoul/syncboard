type TaskCardProps = {
  title: string
  description?: string
  tag?: string
  accentColor?: string
  meta?: { comments?: number; attachments?: number; assigneeInitials?: string }
  done?: boolean
}
import { useState } from 'react'

export default function TaskCard({
  title,
  description,
  tag,
  accentColor = 'bg-cyan-600',
  meta,
  done = false
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <article className="relative bg-white border border-gray-200 p-3 rounded-lg shadow-sm group">
      <div className={`absolute top-0 left-0 h-0.5 w-full ${accentColor}`} />

      <div className="flex justify-between items-start mb-2">
        {tag ? (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-semibold">
            {tag}
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
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                onClick={() => console.log('Edit clicked')}
              >
                Edit
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => console.log('Delete clicked')}
              >
                Delete
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                onClick={() => setShowMenu(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <h3
        className={`font-semibold text-sm ${done ? 'line-through text-gray-400' : ''}`}
      >
        {title}
      </h3>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}

      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {meta?.comments !== undefined && (
            <span className="flex items-center gap-1">
              💬 <span className="font-mono">{meta.comments}</span>
            </span>
          )}
          {meta?.attachments !== undefined && (
            <span className="flex items-center gap-1">
              📎 <span className="font-mono">{meta.attachments}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {meta?.assigneeInitials ? (
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[10px] font-semibold">
              {meta.assigneeInitials}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
