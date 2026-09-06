import type { Server } from 'miragejs'
import type { AppSchema } from '../server'

export default function boardsRoutes(server: Server) {
  server.get('/boards', (schema: AppSchema, request) => {
    const workspaceId = request.queryParams.workspaceId
    return workspaceId
      ? schema
          .all('board')
          .filter(
            (board) =>
              (board.attrs as { workspaceId?: string }).workspaceId ===
              workspaceId
          )
      : schema.all('board')
  })
  server.post('/boards', (schema, request) => {
    const attrs = JSON.parse(request.requestBody)
    return schema.create('board', attrs.board)
  })
}
