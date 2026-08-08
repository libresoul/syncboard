import Sidebar from './components/Sidebar'
import TaskBoard from './components/TaskBoard'

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col border-t border-slate-800/70 lg:border-l lg:border-t-0">
          <header className="flex items-center gap-3 border-b border-slate-800/70 px-6 py-5">
            <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Workspace
              </p>
              <h1 className="text-xl font-semibold tracking-tight">
                Syncboard
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-hidden">
            <TaskBoard />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
