import type { Task, UpdateTaskInput } from '@repo/shared'
import { tasksModel } from '@/models/tasks.model'

export const tasksController = {
  list: async (boardId?: string, workspaceId?: string) =>
    tasksModel.findAll(boardId, workspaceId),
  create: async (task: Task) => tasksModel.create(task),
  update: async (taskId: string, task: UpdateTaskInput) =>
    tasksModel.update(taskId, task),
  remove: async (taskId: string) => tasksModel.remove(taskId)
}
