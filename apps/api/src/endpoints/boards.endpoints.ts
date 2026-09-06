import { boardSchema } from '@repo/shared'
import z from 'zod'
import { boardsController } from '@/controllers/boards.controller'
import { authedEndpointsFactory } from '@/factories/authed.factory'

export const listBoardsEndpoint = authedEndpointsFactory.build({
  method: 'get',
  output: z.object({ boards: z.array(boardSchema) }),
  handler: async () => ({ boards: await boardsController.list() })
})

export const createBoardEndpoint = authedEndpointsFactory.build({
  method: 'post',
  input: z.object({ board: boardSchema }),
  output: z.object({ board: boardSchema }),
  handler: async ({ input: { board } }) => ({
    board: await boardsController.create(board)
  })
})
