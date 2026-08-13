import { Moon, Sun } from 'lucide-react'
import Sidebar from './components/Sidebar'
import TaskBoard from './components/TaskBoard'
import { useTheme } from './context/ThemeContext'

function App() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col border-t border-slate-200 dark:border-slate-800/70 lg:border-l lg:border-t-0">
          <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/70 px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Workspace
              </p>
              <h1 className="text-xl font-semibold tracking-tight">
                Syncboard
              </h1>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-700 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              )}
            </button>
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
