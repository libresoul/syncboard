import { useState } from 'react'
import TaskBoard from './components/TaskBoard'
import WorkspaceSelector from './components/WorkspaceSelector'
import { initialWorkspaces } from './data/mockWorkspaces'
import type { Workspace } from './types/workspace'

function App() {
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
    <main className="p-4 min-h-screen bg-slate-50 flex flex-col">
      <header className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="animate-pulse w-3.5 h-3.5 rounded-full bg-cyan-400" />
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Syncboard
          </h1>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            {currentWorkspace.name}
          </div>
        </div>

        <button
          onClick={handleSwitchWorkspace}
          className="text-xs font-semibold text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50/50 transition-all"
        >
          ⇄ Switch Workspace
        </button>
      </header>

      <div className="flex-1">
        <TaskBoard />
      </div>
    </main>
  )
}

export default App
