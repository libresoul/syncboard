export interface Task {
  id: string
  title: string
  description?: string
  tag?: string
  comments?: number
  attachments?: number
  assignee?: string
  done?: boolean
}
