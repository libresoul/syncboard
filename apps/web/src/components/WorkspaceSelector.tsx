import { useState } from 'react'
import type { Workspace } from '../types/workspace'

interface WorkspaceSelectorProps {
  workspaces: Workspace[]
  onSelectWorkspace: (workspace: Workspace) => void
  onCreateWorkspace: (name: string, description?: string) => void
}

export default function WorkspaceSelector({
  workspaces,
  onSelectWorkspace,
  onCreateWorkspace
}: WorkspaceSelectorProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState('')

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWorkspaceName.trim()) return
    onCreateWorkspace(newWorkspaceName.trim(), newWorkspaceDesc.trim())
    setNewWorkspaceName('')
    setNewWorkspaceDesc('')
    setIsCreating(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        {/* Left Section: Choose Workspace */}
        <div className="p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-6">
              Choose your workspace
            </h2>

            {/* Workspace list */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {workspaces.length === 0 ? (
                <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-500 text-sm font-medium">
                    You don't have any workspaces yet.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Create your first workspace to get started!
                  </p>
                </div>
              ) : (
                workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => onSelectWorkspace(ws)}
                    className="w-full text-left p-5 border-2 border-gray-700 hover:border-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all group bg-gradient-to-r from-amber-50/40 to-white hover:bg-blue-50/30 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {ws.name}
                      </h3>
                      {ws.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {ws.description}
                        </p>
                      )}
                    </div>
                    <span className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all text-xl font-bold">
                      →
                    </span>
                  </button>
                ))
              )}

              {/* Create Workspace Form or Trigger Button */}
              {isCreating ? (
                <form
                  onSubmit={handleCreateSubmit}
                  className="p-5 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50/20 space-y-3"
                >
                  <h4 className="text-sm font-semibold text-blue-900">
                    Create new workspace
                  </h4>
                  <input
                    type="text"
                    placeholder="Workspace name (e.g. Workspace Z)"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newWorkspaceDesc}
                    onChange={(e) => setNewWorkspaceDesc(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                    >
                      Create
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsCreating(true)}
                  className="w-full py-3.5 px-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/40 text-gray-600 hover:text-blue-600 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span className="text-lg">＋</span>
                  Create Workspace
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
            <span>Syncboard v0.1.0</span>
            <span>Collaborative workspace</span>
          </div>
        </div>

        {/* Right Section: Syncboard branding */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 mb-6 shadow-inner">
              <div className="w-8 h-8 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              Syncboard
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Your unified board for tasks, team collaboration, and seamless
              project management.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
