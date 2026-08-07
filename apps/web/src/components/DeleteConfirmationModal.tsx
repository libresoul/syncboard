type DeleteConfirmationModalProps = {
  taskTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmationModal({
  taskTitle,
  onConfirm,
  onCancel
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-6 max-w-sm w-full">
        <h3 className="text-base font-semibold text-gray-900 mb-4 text-center">
          Delete task {taskTitle}?
        </h3>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors border border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
