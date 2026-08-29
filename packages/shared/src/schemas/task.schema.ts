import z from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['todo', 'inprogress', 'done']),
  description: z.string().optional(),
  tag: z.string().optional(),
  comments: z.number().optional(),
  attachments: z.number().optional(),
  assignee: z.string()
})

export type Task = z.infer<typeof taskSchema>
