import { initialWorkspaces, type Workspace } from '@repo/shared'

const workspaces: Workspace[] = initialWorkspaces

export const workspacesModel = {
  findAll: async (): Promise<Workspace[]> => workspaces,
  create: async (workspace: Workspace): Promise<Workspace> => {
    workspaces.push(workspace)
    return workspace
  }
}
