import type { Task, UpdateTaskInput } from '@repo/shared'
import { tasksModel } from '@/models/tasks.model'

export const tasksController = {
  list: async () => tasksModel.findAll(),
  create: async (task: Task) => tasksModel.create(task),
  update: async (taskId: string, task: UpdateTaskInput) => {
    const existingTasks = await tasksModel.findAll()
    const index = existingTasks.findIndex((t) => t.id === taskId)
    if (index !== -1) {
      const existingTask = existingTasks[index]
      if (!existingTask) {
        throw new Error('Task not found')
      }
      const updatedTask: Task = {
        ...existingTask,
        ...task,
        id: taskId,
        title: task.title ?? existingTask.title,
        status: task.status ?? existingTask.status
      }
      existingTasks[index] = updatedTask
      return updatedTask
    } else {
      throw new Error('Task not found')
    }
  },
  remove: async (taskId: string) => {
    const existingTasks = await tasksModel.findAll()
    const index = existingTasks.findIndex((t) => t.id === taskId)
    if (index !== -1) {
      existingTasks.splice(index, 1)
      return true
    } else {
      throw new Error('Task not found')
    }
  }
}
