import { createServer, Model } from 'miragejs'
import type { AnyFactories, ModelDefinition, Registry } from 'miragejs/-types'
import type Schema from 'miragejs/orm/schema'
import mockData from '../data/mockTasks'
import { initialWorkspaces } from '../data/mockWorkspaces'
import type { Task } from '../types/task'
import type { Workspace } from '../types/workspace'
import tasksRoutes from './routes/tasks'
import workspacesRoutes from './routes/workspaces'

type Environment = {
  environment: 'development' | 'test'
}

const taskModel: ModelDefinition<Task> = Model.extend({})
const workspaceModel: ModelDefinition<Workspace> = Model.extend({})

const models = {
  task: taskModel,
  workspace: workspaceModel
}

type AppRegistry = Registry<typeof models, AnyFactories>
export type AppSchema = Schema<AppRegistry>

export function makeServer({ environment = 'development' }: Environment) {
  const server = createServer<typeof models, AnyFactories>({
    environment,
    models,

    routes() {
      this.urlPrefix =
        import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

      tasksRoutes.call(this, this)
      workspacesRoutes.call(this, this)
    },

    seeds(server) {
      mockData.forEach((data) => {
        server.create('task', data)
      })
      initialWorkspaces.forEach((workspace) => {
        server.create('workspace', workspace)
      })
    }
  })

  return server
}
