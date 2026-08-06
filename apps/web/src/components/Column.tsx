import TaskCard from './TaskCard'

type Task = {
  id: string
  title: string
  description?: string
  tag?: string
  comments?: number
  attachments?: number
  assignee?: string
  done?: boolean
}

type ColumnProps = {
  title: string
  tasks: Task[]
  showCreate?: boolean
}

export default function Column({
  title,
  tasks,
  showCreate = false
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
            onClick={() => console.log('Create task clicked in', title)}
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
              title={t.title}
              description={t.description}
              tag={t.tag}
              accentColor={t.done ? 'bg-gray-500' : 'bg-cyan-600'}
              meta={{
                comments: t.comments,
                attachments: t.attachments,
                assigneeInitials: t.assignee
              }}
              done={t.done}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
