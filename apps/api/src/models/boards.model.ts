import type { Board } from '@repo/shared'
import { getCollection } from '@/db/utils'

export const boardsModel = {
  findAll: async (): Promise<Board[]> => {
    const collection = await getCollection<Board>('boards')
    return collection.find().toArray()
  },
  create: async (board: Board): Promise<Board> => {
    const collection = await getCollection<Board>('boards')
    await collection.insertOne(board)
    return board
  }
}
