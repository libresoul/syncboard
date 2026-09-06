import type { Board } from '@repo/shared'

export const mockBoards: Board[] = [
  {
    id: 'B1',
    workspaceId: 'ws-1',
    name: 'UI Planning',
    description: 'Wireframes and component specs',
    lists: 3,
    tasks: 18
  },
  {
    id: 'B2',
    workspaceId: 'ws-1',
    name: 'Integration',
    description: 'APIs, webhooks and CI pipeline',
    lists: 4,
    tasks: 12
  },
  {
    id: 'B3',
    workspaceId: 'ws-2',
    name: 'User Research',
    description: 'Interviews and synthesis',
    lists: 3,
    tasks: 9
  }
]
