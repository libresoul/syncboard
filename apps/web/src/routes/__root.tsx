import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { getSession } from '@/lib/get-session'

export interface MyRouterContext {
  queryClient: QueryClient
  session: Awaited<typeof getSession> | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />
})
