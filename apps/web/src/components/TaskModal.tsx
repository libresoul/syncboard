import type { Task } from '@repo/shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LuX } from 'react-icons/lu'
import { apiClient } from '@/lib/api-client'
import { useSession } from '@/lib/auth-client'

const STATUS_OPTIONS: Array<{ value: Task['status']; label: string }> = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
]

type TaskModalProps = {
  isOpen: boolean
  mode: 'create' | 'edit'
  task?: Task | null
  boardId?: string
  workspaceId?: string
  onClose: () => void
}

export default function TaskModal({
  isOpen,
  mode,
  task,
  boardId,
  workspaceId,
  onClose
}: TaskModalProps) {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const isEditMode = mode === 'edit'
  const currentUser = session?.user.name || session?.user.email || ''

  // biome-ignore lint/suspicious/noExplicitAny: Needed for asserting task status type
  function isValidStatus(value: any): value is Task['status'] {
    const validStatuses = STATUS_OPTIONS.map((opt) => opt.value)
    return validStatuses.includes(value)
  }

  const createMutation = useMutation({
    mutationFn: async (payload: { task: Task }): Promise<Task> => {
      return await apiClient.post<Task>('/tasks', payload)
    },
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const editMutation = useMutation({
    mutationFn: async (payload: { task: Task }): Promise<Task> => {
      return await apiClient.put(`/tasks/${payload.task.id}`, payload)
    },
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const handleSubmitTask = (task: Task) => {
    if (!task.title || !task.description || !task.assignee) {
      return false
    }

    const taskPayload: { task: Task } = {
      task: {
        id: task.id,
        boardId: task.boardId,
        workspaceId: task.workspaceId,
        description: task.description,
        status: task.status,
        title: task.title,
        assignee: task.assignee
      }
    }

    if (mode === 'create') {
      createMutation.mutateAsync(taskPayload)
      return
    }

    if (mode === 'edit') {
      editMutation.mutate(taskPayload)
    }
  }

  const prepareTask = (formData: FormData) => {
    const title = formData.get('title')
    const description = formData.get('description')
    const status = formData.get('status')

    if (!title || !description || !currentUser) {
      return false
    }

    const statusStr = status?.toString() ?? 'todo'
    if (!isValidStatus(statusStr)) {
      return false
    }

    const newTaskData: Task = {
      id: task && mode === 'edit' ? task.id : crypto.randomUUID().toString(),
      boardId: task?.boardId ?? boardId ?? '',
      workspaceId: task?.workspaceId ?? workspaceId ?? '',
      title: title.toString(),
      description: description.toString(),
      assignee: currentUser,
      status: statusStr
    }

    handleSubmitTask(newTaskData)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation()
          onClose()
        }
      }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={onClose}
        aria-label="Close task modal"
      />
      <div
        className="relative w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        role="document"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="task-modal-title"
            className="text-base font-medium text-neutral-900 dark:text-slate-100"
          >
            {isEditMode ? 'Edit task' : 'New task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-neutral-400 transition-colors hover:text-neutral-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <LuX size={18} />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            prepareTask(new FormData(event.currentTarget))
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                defaultValue={task?.title}
                placeholder="Create a new issue"
                className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-600/30"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={task?.description}
                placeholder="Describe the task"
                rows={3}
                className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-600/30"
              />
            </div>

            <div>
              <label
                htmlFor="assignee"
                className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
              >
                Assigned to
              </label>
              <input
                id="assignee"
                name="assignee"
                value={currentUser}
                readOnly
                placeholder="Loading user..."
                className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-600/30"
              />
            </div>
            {!isEditMode && (
              <div>
                <label
                  htmlFor="due-date"
                  className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
                >
                  Due date
                </label>
                <input
                  id="due-date"
                  type="date"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-600/30"
                />
              </div>
            )}
            {isEditMode && (
              <div>
                <label
                  htmlFor="status"
                  className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={task?.status}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-600/30"
                >
                  {STATUS_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {isEditMode ? 'Save changes' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
