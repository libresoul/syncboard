import type { Server } from 'miragejs/server'
import type { AppSchema } from '../server'

export default function workspacesRoutes(server: Server) {
  server.get('/workspaces')

  server.post('/workspaces', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody)
    return schema.create('workspace', attrs.workspace)
  })
}
