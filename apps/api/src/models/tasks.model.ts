import { mockTasks, type Task } from '@repo/shared'

const tasks: Task[] = mockTasks

export const tasksModel = {
  findAll: async (): Promise<Task[]> => tasks,
  create: async (task: Task): Promise<Task> => {
    tasks.push(task)
    return task
  }
}
