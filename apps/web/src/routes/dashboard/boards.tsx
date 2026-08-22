import { createFileRoute } from '@tanstack/react-router'
import Boards from '../../components/Boards'

export const Route = createFileRoute('/dashboard/boards')({
  component: Boards
})
