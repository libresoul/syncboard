import { workspaceSchema } from '@repo/shared'
import { defaultEndpointsFactory } from 'express-zod-api'
import z from 'zod'
import { workspacesController } from '@/controllers/workspaces.controller'

export const listWorkspacesEndpoint = defaultEndpointsFactory.build({
  method: 'get',
  output: z.object({ workspaces: z.array(workspaceSchema) }),
  handler: async () => ({ workspaces: await workspacesController.list() })
})

export const createWorkspacesEndpoint = defaultEndpointsFactory.build({
  method: 'post',
  input: z.object({ workspace: workspaceSchema }),
  output: z.object({ workspace: workspaceSchema }),
  handler: async ({ input: { workspace } }) => ({
    workspace: await workspacesController.create(workspace)
  })
})
