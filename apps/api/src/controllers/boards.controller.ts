import type { Board } from '@repo/shared'
import { boardsModel } from '@/models/boards.model'

export const boardsController = {
  list: async (workspaceId?: string) => boardsModel.findAll(workspaceId),
  create: async (board: Board) => boardsModel.create(board)
}
