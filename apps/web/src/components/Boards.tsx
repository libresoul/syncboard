import { Link } from '@tanstack/react-router'
import { LuPlus } from 'react-icons/lu'
import Boardcard from '../components/Boardcard'
import { Route as tasksRoute } from '../routes/dashboard/tasks'

type Board = {
  id: string
  name: string
  description: string
  lists: number
  tasks: number
}

const boards: Board[] = [
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

export default function Boards() {
  return (
    <div className="flex min-h-screen w-full bg-background p-4 text-foreground">
      <div className="flex w-full overflow-hidden rounded-3xl  bg-card">
        <main className="flex-1 px-8 py-7">
          <h1 className="text-2xl font-semibold tracking-tight">Boards</h1>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {boards.map((b) => (
              <Link to={tasksRoute.to} key={b.id}>
                <Boardcard key={b.name} board={b} />
              </Link>
            ))}

            <button className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-400 text-muted-foreground transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 hover:cursor-pointer">
              <LuPlus className="size-6" />
              <span className="text-sm font-medium">New board</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
