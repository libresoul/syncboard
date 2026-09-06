import type { Board } from '@repo/shared'
import { boardsModel } from '@/models/boards.model'

export const boardsController = {
  list: async () => boardsModel.findAll(),
  create: async (board: Board) => boardsModel.create(board)
}
