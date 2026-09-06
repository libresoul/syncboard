import type { Board } from '@repo/shared'
import { getCollection } from '@/db/utils'

export const boardsModel = {
  findAll: async (workspaceId?: string): Promise<Board[]> => {
    const collection = await getCollection<Board>('boards')
    const match = workspaceId ? { workspaceId } : {}
    return collection
      .aggregate<Board>([
        { $match: match },
        {
          $lookup: {
            from: 'tasks',
            localField: 'id',
            foreignField: 'boardId',
            as: 'boardTasks'
          }
        },
        { $set: { tasks: { $size: '$boardTasks' } } },
        { $project: { boardTasks: 0 } }
      ])
      .toArray()
  },
  create: async (board: Board): Promise<Board> => {
    const collection = await getCollection<Board>('boards')
    await collection.insertOne(board)
    return board
  }
}
