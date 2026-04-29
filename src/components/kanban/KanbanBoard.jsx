import {  useState, useEffect } from 'react'
import { apiFetch } from '../../api/client'
import KanbanColumn from './KanbanColumn'
import AddApplicationModal from '../modals/AddApplicationModal'
import EditApplicationModal from '../modals/EditApplicationModal'
import useMediaQuery from '../../hooks/useMediaQuery'
import MobileBoard from './MobileBoard'

// The four columns in order
const STATUSES = ['Applied', 'Interviewing', 'Offered', 'Rejected']

export default function KanbanBoard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  // Tracks which application is open in the edit modal (null if none)
  const [selectedApp, setSelectedApp] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const isMobile = useMediaQuery('(max-width: 1024px)')

  // Fetch all applications on mount
  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await apiFetch('/applications')
        setApplications(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  // Called when a card is dropped into a new column - updates status via API
  async function handleDrop(appId, newStatus) {
    try {
      await apiFetch(`/applications/${appId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus}),
      })
      // Update local state to reflect the change
      setApplications(prev =>
        prev.map(app =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  // Adds the newly created application to the local state without refetching
  function handleAdd(newApp) {
    setApplications(prev => [...prev, newApp])
  }

  // Replaced the old application in state with the updated one
  function handleUpdate(updatedApp) {
    setApplications(prev =>
      prev.map(app => app._id === updatedApp._id ? updatedApp : app)
    )
  }

  // Removes the application from the local state
  function handleDelete(deletedId) {
    setApplications(prev => prev.filter(app => app._id !== deletedId))
  }

  if (loading) return (
    <div className='flex justify-center items-center h-64 text-gray-400'>
      Loading...
    </div>
  )

  if (error) return (
    <div className='flex justify-center items-center h-64 text-red-400'>
      {error}
    </div>
  )

  // Filter applications by company or role based on search term
  const filteredApplications = applications.filter(app =>
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
        {/* Toolbar */}
        <div className='flex flex-col gap-3 mb-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold text-[#1a1a2e]'>My Applications</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className='bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors'
            >
              + Add Application
            </button>
          </div>
          {/* Search input */}
          <input
            type='text'
            placeholder='Search by company or role...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='border border-gray-200 rounded-full px-4 py-2 text-sm text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full'
          />
        </div>


        {/* Kanban layout - columns on desktop, drawers on mobile */}
        {isMobile ? (
          <MobileBoard
            applications={filteredApplications}
            onCardClick={setSelectedApp}
            onMove={handleDrop}
          />
        ) : (
          <div className='flex gap-4 overflow-x-auto pb-4'>
            {STATUSES.map(status => (
                <KanbanColumn
                key={status}
                status={status}
                // Filter applciaitons belonging to this column
                applications={filteredApplications.filter(app => app.status === status)}
                onDrop={handleDrop}
                onCardClick={setSelectedApp} // Open edit modal when a card is clicked
                />
            ))}
          </div>
        )}

        {/* Add Application Modal */}
        {showAddModal && (
            <AddApplicationModal
                onClose={() => setShowAddModal(false)}
                onAdd={handleAdd}
            />
        )}

        {/* Edit Application Modal */}
        {selectedApp && (
            <EditApplicationModal
                application={selectedApp}
                onClose={() => setSelectedApp(null)}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        )}
    </>
  )
}
