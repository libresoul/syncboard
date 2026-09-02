import { mockTasks, type Task } from '@repo/shared'

const tasks: Task[] = mockTasks

export const tasksModel = {
  findAll: async (): Promise<Task[]> => tasks,
  create: async (task: Task): Promise<Task> => {
    tasks.push(task)
    return task
  },
  update: async (task: Task): Promise<Task> => {
    const index = tasks.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      tasks[index] = task
      return task
    } else {
      throw new Error('Task not found')
    }
  },
  remove: async (taskId: string): Promise<boolean> => {
    const index = tasks.findIndex((t) => t.id === taskId)
    if (index !== -1) {
      tasks.splice(index, 1)
      return true
    } else {
      throw new Error('Task not found')
    }
  }
}
