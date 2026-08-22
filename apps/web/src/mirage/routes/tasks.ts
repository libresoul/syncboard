import { Response } from 'miragejs'
import type { Server } from 'miragejs/server'
import type { AppSchema } from '../server'

export default function tasksRoutes(server: Server) {
  server.get('/tasks')

  server.post('/tasks', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody)
    return schema.create('task', attrs)
  })

  server.put('/tasks/:id', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody)
    const task = schema.find('task', request.params.id)
    if (!task) {
      return new Response(404, {}, { error: 'Task not found' })
    }
    task.update(attrs)
    return new Response(200, {}, task.attrs)
  })

  server.delete('/tasks/:id')
}
