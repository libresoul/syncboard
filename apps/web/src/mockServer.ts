import { createServer } from 'miragejs'
import mockData from './data/mockTasks'

type Environment = {
  environment: 'development' | 'test'
}

export function makeServer({ environment = 'development' }: Environment) {
  const server = createServer({
    environment,
    routes() {
      this.namespace = 'api'
      this.urlPrefix = import.meta.env.VITE_API_URL || 'http://localhost:3000'

      this.get('/tasks', () => {
        return { tasks: mockData }
      })
    }
  })

  return server
}
