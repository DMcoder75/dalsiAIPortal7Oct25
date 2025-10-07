import { useState } from 'react'
import { MoreVertical, Trash2, Edit3, Archive, ArchiveRestore } from 'lucide-react'
import { Button } from './ui/button'

export function ChatOptionsMenu({ chatId, chatTitle, onDelete, onRename, onArchive, onUnarchive, isArchived = false }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [newTitle, setNewTitle] = useState(chatTitle)

  const handleRename = () => {
    if (newTitle.trim()) {
      onRename(newTitle.trim())
      setShowRenameDialog(false)
      setShowMenu(false)
    }
  }

  const handleDelete = () => {
    onDelete()
    setShowDeleteDialog(false)
    setShowMenu(false)
  }

  const handleArchive = () => {
    if (isArchived) {
      onUnarchive()
    } else {
      onArchive()
    }
    setShowMenu(false)
  }

  return (
    <div className="relative">
      {/* Three Dots Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={(e) => {
          e.stopPropagation()
          setShowMenu(!showMenu)
        }}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-8 z-50 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              onClick={(e) => {
                e.stopPropagation()
                setShowRenameDialog(true)
                setShowMenu(false)
              }}
            >
              <Edit3 className="h-4 w-4" />
              <span>Rename</span>
            </button>
            
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              onClick={(e) => {
                e.stopPropagation()
                handleArchive()
              }}
            >
              {isArchived ? (
                <>
                  <ArchiveRestore className="h-4 w-4" />
                  <span>Unarchive</span>
                </>
              ) : (
                <>
                  <Archive className="h-4 w-4" />
                  <span>Archive</span>
                </>
              )}
            </button>
            
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600"
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteDialog(true)
                setShowMenu(false)
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}

      {/* Rename Dialog */}
      {showRenameDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowRenameDialog(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Rename Chat</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700"
              placeholder="Enter new title"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleRename()
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleRename}>
                Rename
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowDeleteDialog(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Delete Chat?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This will permanently delete this chat and all its messages. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
