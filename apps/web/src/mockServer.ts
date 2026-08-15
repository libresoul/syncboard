import { createServer, Model } from 'miragejs'
import type { AnyFactories, Registry } from 'miragejs/-types'
import type Schema from 'miragejs/orm/schema'
import mockData from './data/mockTasks'
import type { Task as TaskShape } from './types/task'

type Environment = {
  environment: 'development' | 'test'
}

const models = {
  task: Model.extend<TaskShape>({} as TaskShape)
}

type AppRegistry = Registry<typeof models, AnyFactories>
type AppSchema = Schema<AppRegistry>

export function makeServer({ environment = 'development' }: Environment) {
  const server = createServer<typeof models, AnyFactories>({
    environment,
    models,

    routes() {
      this.namespace = 'api'
      this.urlPrefix = import.meta.env.VITE_API_URL || 'http://localhost:3000'

      this.get('/tasks', (schema: AppSchema) => {
        return schema.all('task')
      })
    },

    seeds(server) {
      mockData.forEach((data) => {
        server.create('task', data)
      })
    }
  })

  return server
}
