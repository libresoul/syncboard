import type { Workspace } from '@repo/shared'
import { getCollection } from '@/db/utils'

export const workspacesModel = {
  findAll: async (): Promise<Workspace[]> => {
    const collection = await getCollection<Workspace>('workspaces')
    return await collection.find().toArray()
  },
  create: async (workspace: Workspace): Promise<Workspace> => {
    const collection = await getCollection<Workspace>('workspaces')
    await collection.insertOne(workspace)
    return workspace
  }
}
