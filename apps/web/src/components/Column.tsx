import type { Task } from '../types/task'
import TaskCard from './TaskCard'

type ColumnProps = {
  title: string
  tasks: Task[]
  showCreate?: boolean
  onEditTaskClick: (task: Task) => void
  onCreate?: () => void
}

export default function Column({
  title,
  tasks,
  showCreate = false,
  onCreate,
  onEditTaskClick
}: ColumnProps) {
  return (
    <section className="w-[320px] shrink-0 bg-white rounded-xl border border-gray-200 flex flex-col max-h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-lg">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {title}
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-mono">
            {tasks.length}
          </span>
        </h3>

        <button className="text-gray-500 hover:text-gray-700">⋯</button>
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

        <div className="space-y-3">
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              accentColor={t.done ? 'bg-gray-500' : 'bg-cyan-600'}
              meta={{
                comments: t.comments,
                attachments: t.attachments,
                assigneeInitials: t.assignee
              }}
              done={t.done}
              onEditTask={onEditTaskClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
