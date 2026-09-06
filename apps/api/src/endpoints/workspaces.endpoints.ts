import { workspaceSchema } from '@repo/shared'
import z from 'zod'
import { workspacesController } from '@/controllers/workspaces.controller'
import { authedEndpointsFactory } from '@/factories/authed.factory'

export const listWorkspacesEndpoint = authedEndpointsFactory.build({
  method: 'get',
  output: z.object({ workspaces: z.array(workspaceSchema) }),
  handler: async () => ({ workspaces: await workspacesController.list() })
})

export const createWorkspacesEndpoint = authedEndpointsFactory.build({
  method: 'post',
  input: z.object({ workspace: workspaceSchema }),
  output: z.object({ workspace: workspaceSchema }),
  handler: async ({ input: { workspace } }) => ({
    workspace: await workspacesController.create(workspace)
  })
})
