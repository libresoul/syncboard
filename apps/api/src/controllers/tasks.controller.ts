import type { Task } from '@repo/shared'
import { tasksModel } from '@/models/tasks.model'

export const tasksController = {
  list: async () => tasksModel.findAll(),
  create: async (task: Task) => tasksModel.create(task),
  update: async (taskId: string, task: Task) => {
    const existingTasks = await tasksModel.findAll()
    const index = existingTasks.findIndex((t) => t.id === taskId)
    if (index !== -1) {
      existingTasks[index] = task
      return task
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
