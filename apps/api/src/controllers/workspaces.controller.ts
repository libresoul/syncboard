import type { Workspace } from '@repo/shared'
import { workspacesModel } from '@/models/workspaces.model'

export const workspacesController = {
  list: async () => workspacesModel.findAll(),
  create: async (workspace: Workspace) => workspacesModel.create(workspace)
}
