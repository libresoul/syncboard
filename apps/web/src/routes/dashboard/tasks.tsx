import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import TaskBoard from '../../components/TaskBoard'

export const Route = createFileRoute('/dashboard/tasks')({
  validateSearch: z.object({
    boardId: z.string().optional(),
    workspaceId: z.string().optional()
  }),
  component: TaskBoard
})
