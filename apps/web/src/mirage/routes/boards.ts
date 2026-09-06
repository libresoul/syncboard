import type { Server } from 'miragejs'

export default function boardsRoutes(server: Server) {
  server.get('/boards')
  server.post('/boards', (schema, request) => {
    const attrs = JSON.parse(request.requestBody)
    return schema.create('board', attrs.board)
  })
}
