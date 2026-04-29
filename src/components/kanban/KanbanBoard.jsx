import {  useState, useEffect } from 'react'
import { apiFetch } from '../../api/client'
import KanbanColumn from './KanbanColumn'

// The four columns in order
const STATUSES = ['Applied', 'Interviewing', 'Offered', 'Rejected']

export default function KanbanBoard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (loading) return <p className='text-gray-400 text-sm'>Loading...</p>
  if (error) return <p className='text-red-500 text-sm'>Error: {error}</p>

  return (
    <div className='flex gap-4 overflow-x-auto pb-4'>
      {STATUSES.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          // Filter applciaitons belonging to this column
          applications={applications.filter(app => app.status === status)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}
