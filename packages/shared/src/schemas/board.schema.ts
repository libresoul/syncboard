import * as z from 'zod/mini'

export const boardSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  lists: z.number(),
  tasks: z.number()
})

export type Board = z.infer<typeof boardSchema>
