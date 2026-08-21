import type { Workspace } from '../types/workspace'

export const initialWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Workspace X',
    description: 'Main project workspace for team sync',
    color: 'bg-amber-400'
  },
  {
    id: 'ws-2',
    name: 'Workspace Y',
    description: 'Secondary workspace for development tasks',
    color: 'bg-emerald-400'
  }
]
