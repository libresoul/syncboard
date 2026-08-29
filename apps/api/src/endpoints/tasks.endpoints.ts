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
