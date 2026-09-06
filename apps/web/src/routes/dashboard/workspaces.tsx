import { createFileRoute } from '@tanstack/react-router'
import WorkspaceSelector from '@/components/WorkspaceSelector'

export const Route = createFileRoute('/dashboard/workspaces')({
  component: RouteComponent
})

function RouteComponent() {
  return <WorkspaceSelector />
}
