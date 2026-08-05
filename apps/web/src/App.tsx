import TaskBoard from './components/TaskBoard'

function App() {
  return (
    <main className="p-4">
      <header className="flex items-center gap-2 mb-4">
        <div className="animate-pulse w-3 h-3 rounded-full bg-cyan-400"></div>
        <h1 className="text-xl font-bold">Syncboard</h1>
      </header>

      <TaskBoard />
    </main>
  )
}

export default App
