import type { Task } from '../types/task'

const mockData: { todo: Task[]; inprogress: Task[]; done: Task[] } = {
  todo: [
    {
      id: 't1',
      title: 'Design New Logo',
      description: 'Create updated logo variations',
      tag: 'Design',
      comments: 2,
      assignee: 'AL'
    },
    {
      id: 't2',
      title: 'Update Documentation',
      description: 'Add getting started section',
      tag: 'Docs',
      comments: 1,
      assignee: 'JD'
    },
    {
      id: 't3',
      title: 'Review PR #42',
      description: 'Check new auth changes',
      tag: 'Review',
      comments: 0,
      assignee: 'MG'
    }
  ],
  inprogress: [
    {
      id: 'p1',
      title: 'User Research Analysis',
      description: 'Summarize findings and insights',
      tag: 'Research',
      attachments: 3,
      assignee: 'AK'
    },
    {
      id: 'p2',
      title: 'Fix Login Bug',
      description: 'Investigate authentication flow',
      tag: 'Bug',
      comments: 4,
      assignee: 'JD'
    }
  ],
  done: [
    {
      id: 'd1',
      title: 'Project Kickoff',
      description: '',
      tag: 'Management',
      done: true
    },
    {
      id: 'd2',
      title: 'Initial Setup',
      description: '',
      tag: 'DevOps',
      done: true
    }
  ]
}

export default mockData
