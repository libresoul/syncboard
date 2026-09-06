import type { Board } from '@repo/shared'

export const mockBoards: Board[] = [
  {
    id: 'B1',
    name: 'UI Planning',
    description: 'Wireframes and component specs',
    lists: 3,
    tasks: 18
  },
  {
    id: 'B2',
    name: 'Integration',
    description: 'APIs, webhooks and CI pipeline',
    lists: 4,
    tasks: 12
  },
  {
    id: 'B3',
    name: 'User Research',
    description: 'Interviews and synthesis',
    lists: 3,
    tasks: 9
  }
]
