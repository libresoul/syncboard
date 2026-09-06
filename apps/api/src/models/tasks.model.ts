import type { Task, UpdateTaskInput } from '@repo/shared'
import { getCollection } from '@/db/utils'

export const tasksModel = {
  findAll: async (boardId?: string, workspaceId?: string): Promise<Task[]> => {
    const collection = await getCollection<Task>('tasks')
    const filter = {
      ...(boardId ? { boardId } : {}),
      ...(workspaceId ? { workspaceId } : {})
    }
    return collection.find(filter).toArray()
  },
  create: async (task: Task): Promise<Task> => {
    const collection = await getCollection<Task>('tasks')
    await collection.insertOne(task)
    return task
  },
  update: async (taskId: string, task: UpdateTaskInput): Promise<Task> => {
    const collection = await getCollection<Task>('tasks')
    const existing = await collection.findOne({ id: taskId })
    if (!existing) {
      throw new Error('task not found')
    }

    const result = await collection.findOneAndUpdate(
      { id: taskId },
      {
        $set: {
          title: task.title ?? existing.title,
          status: task.status ?? existing.status,
          ...(task.boardId !== undefined && { boardId: task.boardId }),
          ...(task.workspaceId !== undefined && {
            workspaceId: task.workspaceId
          }),
          ...(task.description !== undefined && {
            description: task.description
          }),
          ...(task.tag !== undefined && { tag: task.tag }),
          ...(task.comments !== undefined && { comments: task.comments }),
          ...(task.attachments !== undefined && {
            attachments: task.attachments
          }),
          ...(task.assignee !== undefined && { assignee: task.assignee })
        }
      },
      { returnDocument: 'after' }
    )
    if (!result) {
      throw new Error('task not found')
    }

    return result
  },
  remove: async (taskId: string) => {
    const collection = await getCollection<Task>('tasks')
    const result = await collection.deleteOne({ id: taskId })

    if (result.deletedCount === 0) {
      throw new Error('task not found')
    }
  }
}
