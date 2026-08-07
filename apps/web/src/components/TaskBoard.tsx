import { useEffect, useState } from 'react'
import mockData from '../data/mockTasks'
import type { Task } from '../types/task'
import Column from './Column'
import CreateTaskModal from './CreateTaskModal'
import DeleteConfirmationModal from './DeleteConfirmationModal'

type BoardState = {
  todo: Task[]
  inprogress: Task[]
  done: Task[]
}

type ColumnKey = keyof BoardState

const columnLabels: Record<ColumnKey, string> = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
}

export default function TaskBoard() {
  const [board, setBoard] = useState<BoardState>(mockData)
  const [editingTask, setEditingTask] = useState<{
    column: ColumnKey
    task: Task
  } | null>(null)
  const [form, setForm] = useState<{
    title: string
    assignee: string
    status: ColumnKey
  } | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  useEffect(() => {
    setForm(
      editingTask
        ? {
            title: editingTask.task.title,
            assignee: editingTask.task.assignee ?? '',
            status: editingTask.column
          }
        : null
    )
  }, [editingTask])

  const openEditTask = (column: ColumnKey, task: Task) => {
    setEditingTask({ column, task })
  }

  const createTask = (formData: FormData) => {
    const title = formData.get('title')
    const description = formData.get('description')
    const assignee = formData.get('assignee')

    if (!title || !description || !assignee) {
      return
    }
    const newTask = {
      id: Date.now().toString(),
      title: title.toString(),
      description: description.toString(),
      assignee: assignee.toString(),
      comments: 0
    }

    setBoard((currentBoard) => {
      const nextBoard: BoardState = {
        ...currentBoard,
        todo: [...currentBoard.todo, newTask]
      }
      return nextBoard
    })
  }

  const saveTask = () => {
    if (!editingTask || !form) {
      return
    }

    const updatedTask: Task = {
      ...editingTask.task,
      title: form.title,
      assignee: form.assignee,
      done: form.status === 'done'
    }

    setBoard((currentBoard) => {
      const nextBoard: BoardState = {
        todo: currentBoard.todo.filter(
          (task) => task.id !== editingTask.task.id
        ),
        inprogress: currentBoard.inprogress.filter(
          (task) => task.id !== editingTask.task.id
        ),
        done: currentBoard.done.filter(
          (task) => task.id !== editingTask.task.id
        )
      }

      nextBoard[form.status] = [...nextBoard[form.status], updatedTask]

      return nextBoard
    })

    setEditingTask(null)
    setForm(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setBoard((currentBoard) => ({
      ...currentBoard,
      todo: currentBoard.todo.filter((task) => task.id != taskId),
      inprogress: currentBoard.inprogress.filter((task) => task.id != taskId),
      done: currentBoard.done.filter((task) => task.id != taskId)
    }))
    setTaskToDelete(null)
  }
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <>
      <div className="flex gap-4 h-full overflow-x-auto pb-4 items-start p-4">
        <Column
          title="To Do"
          tasks={board.todo}
          showCreate
          onCreate={() => setIsCreateOpen(true)}
          onEditTaskClick={(task) => openEditTask('todo', task)}
          onDeleteTask={(task) => setTaskToDelete(task)}
        />
        <Column
          title="In Progress"
          tasks={board.inprogress}
          onEditTaskClick={(task) => openEditTask('inprogress', task)}
          onDeleteTask={(task) => setTaskToDelete(task)}
        />
        <Column
          title="Done"
          tasks={board.done}
          onEditTaskClick={(task) => openEditTask('done', task)}
          onDeleteTask={(task) => setTaskToDelete(task)}
        />
      </div>

      {editingTask && form ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close edit task dialog"
            className="absolute inset-0 bg-black/50"
            onClick={() => setEditingTask(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-task-title"
            className="relative z-10 w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Edit Task
                </p>
                <h2
                  id="edit-task-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {form.title}
                </h2>
              </div>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setEditingTask(null)}
              >
                Close
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </span>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-500"
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">
                  Assign To
                </span>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-500"
                  value={form.assignee}
                  onChange={(event) =>
                    setForm({ ...form, assignee: event.target.value })
                  }
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </span>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-500 bg-white"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as ColumnKey
                    })
                  }
                >
                  {Object.entries(columnLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
                onClick={saveTask}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <CreateTaskModal
        isOpen={isCreateOpen}
        onCreate={createTask}
        onClose={() => setIsCreateOpen(false)}
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
