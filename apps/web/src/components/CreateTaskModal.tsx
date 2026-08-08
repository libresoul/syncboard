import { X } from 'lucide-react'
import mockData from '../data/mockTasks'

const ASSIGNEES = [
  ...new Set(
    Object.values(mockData)
      .flat()
      .flatMap((task) => (task.assignee ? [task.assignee] : []))
  )
]

type CreateTaskModalProps = {
  isOpen: boolean
  onCreate: (data: FormData) => void
  onClose: () => void
}

export default function CreateTaskModal({
  isOpen,
  onCreate,
  onClose
}: CreateTaskModalProps) {
  const handleClose = () => {
    onClose()
  }

  const handleCreate = (formData: FormData) => {
    onCreate(formData)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          handleClose()
        }
      }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
        aria-label="Close task modal"
      />
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        role="document"
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            id="create-task-title"
            className="text-base font-medium text-neutral-900"
          >
            New task
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate(new FormData(e.currentTarget))
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-medium text-neutral-500 mb-1.5"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                placeholder="Create a new issue"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 resize-none"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-medium text-neutral-500 mb-1.5"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the task"
                  rows={3}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="assignee"
                  className="block text-xs font-medium text-neutral-500 mb-1.5"
                >
                  Assigned to
                </label>
                <select
                  id="assignee"
                  name="assignee"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 bg-white"
                >
                  {ASSIGNEES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="due-date"
                  className="block text-xs font-medium text-neutral-500 mb-1.5"
                >
                  Due date
                </label>
                <input
                  id="due-date"
                  type="date"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-2 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
