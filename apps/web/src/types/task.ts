export interface Task {
  id: string
  title: string
  status: 'todo' | 'inprogress' | 'done'
  description?: string
  tag?: string
  comments?: number
  attachments?: number
  assignee?: string
}
