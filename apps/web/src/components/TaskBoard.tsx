import mockData from '../data/mockTasks'
import Column from './Column'

export default function TaskBoard() {
  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-4 items-start p-4">
      <Column title="To Do" tasks={mockData.todo} showCreate />
      <Column title="In Progress" tasks={mockData.inprogress} />
      <Column title="Done" tasks={mockData.done} />
    </div>
  )
}
