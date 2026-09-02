import { taskSchema } from '@repo/shared'
import { defaultEndpointsFactory } from 'express-zod-api'
import z from 'zod'
import { tasksController } from '@/controllers/tasks.controller'

export const listTasksEndpoint = defaultEndpointsFactory.build({
  method: 'get',
  output: z.object({ tasks: z.array(taskSchema) }),
  handler: async () => ({ tasks: await tasksController.list() })
})

export const createTaskEndpoint = defaultEndpointsFactory.build({
  method: 'post',
  input: z.object({ task: taskSchema }),
  output: z.object({ task: taskSchema }),
  handler: async ({ input: { task } }) => ({
    task: await tasksController.create(task)
  })
})

export const updateTaskEndpoint = defaultEndpointsFactory.build({
  method: 'put',
  input: z.object({ task: taskSchema }),
  output: z.object({ task: taskSchema }),
  handler: async ({ input: { task } }) => ({
    task: await tasksController.update(task)
  })
})

export const deleteTaskEndpoint = defaultEndpointsFactory.build({
  method: 'delete',
  input: z.object({ taskId: z.string() }),
  output: z.object({ success: z.boolean() }),
  handler: async ({ input: { taskId } }) => {
    await tasksController.remove(taskId)
    return { success: true }
  }
})
