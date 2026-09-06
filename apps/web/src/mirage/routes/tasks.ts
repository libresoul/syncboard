import { Response } from 'miragejs'
import type { Server } from 'miragejs/server'
import type { AppSchema } from '../server'

export default function tasksRoutes(server: Server) {
  server.get('/tasks', (schema: AppSchema, request) => {
    const { boardId, workspaceId } = request.queryParams
    return schema.all('task').filter((task) => {
      const attrs = task.attrs as {
        boardId?: string
        workspaceId?: string
      }
      return (
        (!boardId || attrs.boardId === boardId) &&
        (!workspaceId || attrs.workspaceId === workspaceId)
      )
    })
  })

  server.post('/tasks', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody)
    return schema.create('task', attrs.task)
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
