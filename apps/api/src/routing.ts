import type { Routing } from 'express-zod-api'
import { helloEndpoint } from './endpoints/hello'
import {
  createTaskEndpoint,
  listTasksEndpoint
} from './endpoints/tasks.endpoints'
import {
  createWorkspacesEndpoint,
  listWorkspacesEndpoint
} from './endpoints/workspaces.endpoints'

export const routing: Routing = {
  '/': helloEndpoint,
  api: {
    tasks: {
      get: listTasksEndpoint,
      post: createTaskEndpoint
    },
    workspaces: {
      get: listWorkspacesEndpoint,
      post: createWorkspacesEndpoint
    }
  }
}
