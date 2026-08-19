import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/api-client'
import type { Task } from '../types/task'

type DeleteConfirmationModalProps = {
  task: Task
  onSettle: () => void
}

export default function DeleteConfirmationModal({
  task,
  onSettle
}: DeleteConfirmationModalProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (taskId: string) => {
      return await apiClient.delete<null>(`/tasks/${taskId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onSettled: () => {
      onSettle()
    }
  })

  const handleDeleteTask = () => {
    mutation.mutateAsync(task.id)
    return
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 dark:bg-black/60">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-center text-base font-semibold text-gray-900 dark:text-slate-100">
          Delete task {task.title}?
        </h3>
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleDeleteTask}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onSettle}
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
