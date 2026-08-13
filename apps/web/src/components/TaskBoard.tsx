import { useState } from 'react'
import tasks from '../data/mockTasks'
import type { Task } from '../types/task'
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
  const [board, setBoard] = useState<Task[]>(tasks)
  const [isTaskModalOpen, setTaskModalOpen] = useState(false)
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>(
    'create'
  )
  const [task, setTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  const assignees = Array.from(
    new Set(board.flatMap((currentTask) => currentTask.assignee ?? []))
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

  const createTask = (formData: FormData) => {
    const title = formData.get('title')
    const description = formData.get('description')
    const assignee = formData.get('assignee')

    if (!title || !description || !assignee) {
      return false
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.toString(),
      status: 'todo',
      description: description.toString(),
      assignee: assignee.toString(),
      comments: 0
    }

    setBoard((currentBoard) => {
      const nextBoard = [...currentBoard, newTask]
      return nextBoard
    })

    return true
  }

  const saveTask = (formData: FormData) => {
    if (!task) {
      return
    }

    const title = formData.get('title')
    const assignee = formData.get('assignee')
    const status = formData.get('status')

    if (!title || !assignee || !status) {
      return
    }

    if (status !== 'todo' && status !== 'inprogress' && status !== 'done') {
      return
    }

    const updatedTask: Task = {
      ...task,
      title: title.toString(),
      assignee: assignee.toString(),
      status
    }

    setBoard((currentBoard) => {
      return currentBoard.map((t) => (t.id === task.id ? updatedTask : t))
    })

    closeTaskModal()
  }

  const handleTaskSubmit = (formData: FormData) => {
    if (taskModalMode === 'create') {
      if (createTask(formData)) {
        closeTaskModal()
      }
      return
    }

    saveTask(formData)
  }

  const handleDeleteTask = (taskId: string) => {
    setBoard((currentBoard) => [
      ...currentBoard.filter((task) => task.id !== taskId)
    ])
    setTaskToDelete(null)
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
            {board
              .filter((task) => task.status === value)
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
              ))}
          </Column>
        ))}
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        mode={taskModalMode}
        task={task}
        assignees={assignees}
        onSubmit={handleTaskSubmit}
        onClose={closeTaskModal}
      />
      {taskToDelete && (
        <DeleteConfirmationModal
          taskTitle={taskToDelete.title}
          onConfirm={() => handleDeleteTask(taskToDelete.id)}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </>
  )
}
