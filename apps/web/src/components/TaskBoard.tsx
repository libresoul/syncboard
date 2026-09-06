import type { Task } from '@repo/shared'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { Route } from '../routes/dashboard/tasks'
import Column from './Column'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

export const columnLabels: Record<Task['status'], string> = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
}

export default function TaskBoard() {
  const { boardId, workspaceId } = Route.useSearch()
  const taskQuery = useQuery({
    queryKey: ['tasks', boardId, workspaceId],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (boardId) params.set('boardId', boardId)
      if (workspaceId) params.set('workspaceId', workspaceId)
      const query = params.toString()
      const { tasks } = await apiClient.get<{ tasks: Task[] }>(
        `/tasks${query ? `?${query}` : ''}`
      )
      return tasks
    },
    enabled: Boolean(boardId && workspaceId)
  })

  const [isTaskModalOpen, setTaskModalOpen] = useState(false)
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>(
    'create'
  )
  const [task, setTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  const assignees = Array.from(
    new Set(
      taskQuery.data?.flatMap((currentTask) => currentTask.assignee ?? [])
    )
  )

  const openCreateTask = () => {
    setTaskModalMode('create')
    setTask(null)
    setTaskModalOpen(true)
  }

  const openEditTask = (task: Task) => {
    setTaskModalMode('edit')
    setTask(task)
    setTaskModalOpen(true)
  }

  const closeTaskModal = () => {
    setTaskModalOpen(false)
    setTask(null)
  }

  return (
    <>
      <div className="flex gap-4 h-full overflow-x-auto pb-4 items-start p-4">
        {Object.entries(columnLabels).map(([value, label]) => (
          <Column
            key={value}
            title={label}
            showCreate={value === 'todo'}
            onCreate={openCreateTask}
          >
            {taskQuery.data
              ?.filter((task) => task.status === value)
              .map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  accentColor={
                    t.status === 'done' ? 'bg-gray-500' : 'bg-cyan-600'
                  }
                  onEditTask={() => openEditTask(t)}
                  onDelete={() => setTaskToDelete(t)}
                />
              )) ?? []}
          </Column>
        ))}
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        mode={taskModalMode}
        task={task}
        assignees={assignees}
        boardId={boardId}
        workspaceId={workspaceId}
        onClose={closeTaskModal}
      />
      {taskToDelete && (
        <DeleteConfirmationModal
          task={taskToDelete}
          onSettle={() => setTaskToDelete(null)}
        />
      )}
    </>
  )
}
