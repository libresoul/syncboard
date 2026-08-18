import { createServer, Model, Response } from 'miragejs'
import type { AnyFactories, ModelDefinition, Registry } from 'miragejs/-types'
import type Schema from 'miragejs/orm/schema'
import mockData from './data/mockTasks'
import type { Task } from './types/task'

type Environment = {
  environment: 'development' | 'test'
}

const taskModel: ModelDefinition<Task> = Model.extend({})

const models = {
  task: taskModel
}

type AppRegistry = Registry<typeof models, AnyFactories>
type AppSchema = Schema<AppRegistry>

export function makeServer({ environment = 'development' }: Environment) {
  const server = createServer<typeof models, AnyFactories>({
    environment,
    models,

    routes() {
      this.urlPrefix =
        import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

      this.get('/tasks')

      this.post('/tasks', (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody)
        return schema.create('task', attrs)
      })

      this.put('/tasks/:id', (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const task = schema.find('task', request.params.id)
        if (!task) {
          return new Response(404, {}, { error: 'Task not found' })
        }
        task.update(attrs)
        return new Response(200, {}, task.attrs)
      })

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
