import type { Board } from '@repo/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { LuPlus, LuX } from 'react-icons/lu'
import Boardcard from '../components/Boardcard'
import { apiClient } from '../lib/api-client'
import { Route } from '../routes/dashboard/boards'
import { Route as tasksRoute } from '../routes/dashboard/tasks'

export default function Boards() {
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { workspaceId } = Route.useSearch()

  const boardsQuery = useQuery({
    queryKey: ['boards', workspaceId],
    queryFn: async () => {
      const query = workspaceId
        ? `?workspaceId=${encodeURIComponent(workspaceId)}`
        : ''
      const { boards } = await apiClient.get<{ boards: Board[] }>(
        `/boards${query}`
      )
      return boards
    },
    enabled: Boolean(workspaceId)
  })

  const createBoardMutation = useMutation({
    mutationFn: async (board: Board) =>
      apiClient.post<{ board: Board }>('/boards', { board }),
    onSuccess: () => {
      setIsCreateOpen(false)
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    }
  })

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString().trim()

    if (!name) {
      return
    }

    createBoardMutation.mutate({
      id: crypto.randomUUID(),
      workspaceId: workspaceId ?? '',
      name,
      description: formData.get('description')?.toString().trim() || undefined,
      lists: 0,
      tasks: 0
    })
  }

  return (
    <div className="flex min-h-screen w-full bg-background p-4 text-foreground">
      <div className="flex w-full overflow-hidden rounded-3xl  bg-card">
        <main className="flex-1 px-8 py-7">
          <h1 className="text-2xl font-semibold tracking-tight">Boards</h1>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {boardsQuery.data?.map((b) => (
              <Link
                to={tasksRoute.to}
                search={{ boardId: b.id, workspaceId: b.workspaceId }}
                key={b.id}
              >
                <Boardcard key={b.name} board={b} />
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-400 text-muted-foreground transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 hover:cursor-pointer"
            >
              <LuPlus className="size-6" />
              <span className="text-sm font-medium">New board</span>
            </button>
          </div>
        </main>
      </div>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-board-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40 dark:bg-black/60"
            onClick={() => setIsCreateOpen(false)}
            aria-label="Close new board dialog"
          />
          <div className="relative w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="new-board-title"
                className="text-base font-medium text-neutral-900 dark:text-slate-100"
              >
                New board
              </h2>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                aria-label="Close"
                className="text-neutral-400 transition-colors hover:text-neutral-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <LuX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label
                  htmlFor="board-name"
                  className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
                >
                  Name
                </label>
                <input
                  id="board-name"
                  name="name"
                  required
                  placeholder="e.g. Product launch"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                />
              </div>
              <div>
                <label
                  htmlFor="board-description"
                  className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-slate-400"
                >
                  Description
                </label>
                <textarea
                  id="board-description"
                  name="description"
                  rows={3}
                  placeholder="What is this board for?"
                  className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                />
              </div>
              {createBoardMutation.isError && (
                <p className="text-sm text-red-600" role="alert">
                  Could not create the board. Please try again.
                </p>
              )}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBoardMutation.isPending}
                  className="rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {createBoardMutation.isPending ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
