import type { Routing } from 'express-zod-api'
import {
  createBoardEndpoint,
  listBoardsEndpoint
} from './endpoints/boards.endpoints'
import { helloEndpoint } from './endpoints/hello'
import {
  createTaskEndpoint,
  deleteTaskEndpoint,
  listTasksEndpoint,
  updateTaskEndpoint
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
      post: createTaskEndpoint,
      ':taskId': {
        put: updateTaskEndpoint,
        delete: deleteTaskEndpoint
      }
    },
    boards: {
      get: listBoardsEndpoint,
      post: createBoardEndpoint
    },
    workspaces: {
      get: listWorkspacesEndpoint,
      post: createWorkspacesEndpoint
    }
  }
}
