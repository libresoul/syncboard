import type { Task } from '@repo/shared'

export const mockTasks: Task[] = [
  {
    id: 't1',
    assignee: 'AL',
    comments: 2,
    description: 'Create updated logo variations',
    status: 'inprogress',
    tag: 'Design',
    title: 'Design New Logo'
  },
  {
    id: 't2',
    assignee: 'JD',
    comments: 1,
    description: 'Add getting started section',
    status: 'done',
    tag: 'Docs',
    title: 'Update Documentation'
  },
  {
    id: 't3',
    assignee: 'MG',
    comments: 0,
    description: 'Check new auth changes',
    status: 'todo',
    tag: 'Review',
    title: 'Review PR #42'
  },
  {
    id: 'p1',
    assignee: 'AK',
    attachments: 3,
    description: 'Summarize findings and insights',
    status: 'inprogress',
    tag: 'Research',
    title: 'User Research Analysis'
  },
  {
    id: 'p2',
    assignee: 'JD',
    comments: 4,
    description: 'Investigate authentication flow',
    status: 'done',
    tag: 'Bug',
    title: 'Fix Login Bug'
  },
  {
    id: 'd1',
    description: '',
    status: 'done',
    tag: 'Management',
    title: 'Project Kickoff'
  },
  {
    id: 'd2',
    description: '',
    status: 'todo',
    tag: 'DevOps',
    title: 'Initial Setup'
  }
]
