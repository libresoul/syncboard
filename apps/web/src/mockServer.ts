import { createServer, Model } from 'miragejs'
import type { AnyFactories } from 'miragejs/-types'
import mockData from './data/mockTasks'
import type { Task as TaskShape } from './types/task'

type Environment = {
  environment: 'development' | 'test'
}

const models = {
  task: Model.extend<TaskShape>({} as TaskShape)
}

export function makeServer({ environment = 'development' }: Environment) {
  const server = createServer<typeof models, AnyFactories>({
    environment,
    models,

    routes() {
      this.namespace = 'api'
      this.urlPrefix = import.meta.env.VITE_API_URL || 'http://localhost:3000'

      this.get('/tasks')
      this.post('/tasks')
      this.put('/tasks/:id')
      this.delete('/tasks/:id')
    },

    seeds(server) {
      mockData.forEach((data) => {
        server.create('task', data)
      })
    }
  })

  return server
}
