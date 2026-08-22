import { createFileRoute } from '@tanstack/react-router'
import TaskBoard from '../../components/TaskBoard'

export const Route = createFileRoute('/dashboard/')({
  component: TaskBoard
})
