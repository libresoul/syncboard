import { useState } from 'react'
import mockData from '../data/mockTasks'
import type { Task } from '../types/task'
import Column from './Column'
import DeleteConfirmationModal from './DeleteConfirmationModal'

export default function TaskBoard() {
  const [tasks, setTasks] = useState(mockData)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => ({
      todo: prev.todo.filter((t) => t.id !== taskId),
      inprogress: prev.inprogress.filter((t) => t.id !== taskId),
      done: prev.done.filter((t) => t.id !== taskId)
    }))
    setTaskToDelete(null)
  }

  return (
    <>
      <div className="flex gap-4 h-full overflow-x-auto pb-4 items-start p-4">
        <Column
          title="To Do"
          tasks={tasks.todo}
          showCreate
          onDeleteTask={(task) => setTaskToDelete(task)}
        />
        <Column
          title="In Progress"
          tasks={tasks.inprogress}
          onDeleteTask={(task) => setTaskToDelete(task)}
        />
        <Column
          title="Done"
          tasks={tasks.done}
          onDeleteTask={(task) => setTaskToDelete(task)}
        />
      </div>

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
