import * as z from 'zod/mini'

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['todo', 'inprogress', 'done']),
  description: z.optional(z.string()),
  tag: z.optional(z.string()),
  comments: z.optional(z.number()),
  attachments: z.optional(z.number()),
  assignee: z.optional(z.string())
})

export type Task = z.infer<typeof taskSchema>
