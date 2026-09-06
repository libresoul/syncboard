import { taskSchema, updateTaskSchema } from '@repo/shared'
import z from 'zod'
import { tasksController } from '@/controllers/tasks.controller'
import { authedEndpointsFactory } from '@/factories/authed.factory'

export const listTasksEndpoint = authedEndpointsFactory.build({
  method: 'get',
  output: z.object({ tasks: z.array(taskSchema) }),
  handler: async () => ({ tasks: await tasksController.list() })
})

export const createTaskEndpoint = authedEndpointsFactory.build({
  method: 'post',
  input: z.object({ task: taskSchema }),
  output: z.object({ task: taskSchema }),
  handler: async ({ input: { task } }) => ({
    task: await tasksController.create(task)
  })
})

export const updateTaskEndpoint = authedEndpointsFactory.build({
  method: 'put',
  input: z.object({ taskId: z.string(), task: updateTaskSchema }),
  output: z.object({ task: taskSchema }),
  handler: async ({ input: { taskId, task } }) => ({
    task: await tasksController.update(taskId, task)
  })
})

export const deleteTaskEndpoint = authedEndpointsFactory.build({
  method: 'delete',
  input: z.object({ taskId: z.string() }),
  output: z.object({ success: z.boolean() }),
  handler: async ({ input: { taskId } }) => {
    await tasksController.remove(taskId)
    return { success: true }
  }
})
