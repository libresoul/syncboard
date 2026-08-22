import { useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import Sidebar from './components/Sidebar'
import TaskBoard from './components/TaskBoard'
import WorkspaceSelector from './components/WorkspaceSelector'
import { initialWorkspaces } from './data/mockWorkspaces'
import { useTheme } from './hooks/useTheme'
import type { Workspace } from './types/workspace'

function App() {
  const { isDark, toggleTheme } = useTheme()
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces)
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  )

  const handleSelectWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace)
  }

  const handleCreateWorkspace = (name: string, description?: string) => {
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name,
      description,
      color: 'bg-cyan-500'
    }
    setWorkspaces((prev) => [...prev, newWs])
    setCurrentWorkspace(newWs)
  }

  const handleSwitchWorkspace = () => {
    setCurrentWorkspace(null)
  }

  if (!currentWorkspace) {
    return (
      <WorkspaceSelector
        workspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        onCreateWorkspace={handleCreateWorkspace}
      />
    )
  }

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
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight">
                  Syncboard
                </h1>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {currentWorkspace.name}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSwitchWorkspace}
                className="text-xs font-semibold text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-cyan-400 transition-all"
              >
                ⇄ Switch Workspace
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  isDark ? 'Switch to light mode' : 'Switch to dark mode'
                }
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-700 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {isDark ? (
                  <LuSun className="h-5 w-5 text-amber-400" />
                ) : (
                  <LuMoon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                )}
              </button>
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
