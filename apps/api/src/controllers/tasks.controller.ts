import type { Task } from '@repo/shared'
import { tasksModel } from '@/models/tasks.model'

export const tasksController = {
  list: async () => tasksModel.findAll(),
  create: async (task: Task) => tasksModel.create(task)
}
