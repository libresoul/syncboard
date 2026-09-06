import { boardSchema } from '@repo/shared'
import z from 'zod'
import { boardsController } from '@/controllers/boards.controller'
import { authedEndpointsFactory } from '@/factories/authed.factory'

export const listBoardsEndpoint = authedEndpointsFactory.build({
  method: 'get',
  input: z.object({ workspaceId: z.string().optional() }),
  output: z.object({ boards: z.array(boardSchema) }),
  handler: async ({ input: { workspaceId } }) => ({
    boards: await boardsController.list(workspaceId)
  })
})

export const createBoardEndpoint = authedEndpointsFactory.build({
  method: 'post',
  input: z.object({ board: boardSchema }),
  output: z.object({ board: boardSchema }),
  handler: async ({ input: { board } }) => ({
    board: await boardsController.create(board)
  })
})
