import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import Boards from '../../components/Boards'

export const Route = createFileRoute('/dashboard/boards')({
  validateSearch: z.object({
    workspaceId: z.string().optional()
  }),
  component: Boards
})
