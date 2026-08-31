import * as z from 'zod/mini'

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  color: z.optional(z.string())
})

export type Workspace = z.infer<typeof workspaceSchema>
