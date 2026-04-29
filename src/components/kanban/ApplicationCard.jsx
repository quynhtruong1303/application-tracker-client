import { useState } from 'react'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

const BADGE_STYLES = {
  Applied:      'bg-indigo-100 text-indigo-600',
  Interviewing: 'bg-amber-100 text-amber-600',
  Offered:      'bg-emerald-100 text-emerald-600',
  Rejected:     'bg-red-100 text-red-600',
}

const STATUS_COLORS = {
  Applied:      'bg-indigo-500',
  Interviewing: 'bg-amber-400',
  Offered:      'bg-emerald-500',
  Rejected:     'bg-red-400',
}

const ALL_STATUSES = ['Applied', 'Interviewing', 'Offered', 'Rejected']

export default function ApplicationCard({ application, onClick, onMove, isMobile }) {
  const [showMover, setShowMover] = useState(false)

  function handleDragStart(e) {
    e.dataTransfer.setData('appId', application._id)
  }

  // Stop propagation so clicking Move or a status button doesn't open the edit modal
  function toggleMover(e) {
    e.stopPropagation()
    setShowMover(prev => !prev)
  }

  function handleMove(e, newStatus) {
    e.stopPropagation()
    onMove(application._id, newStatus)
    setShowMover(false)
  }

  return (
    <div
      draggable={!isMobile}
      onDragStart={!isMobile ? handleDragStart : undefined}
      onClick={onClick}
      className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${
        isMobile ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <p className="font-semibold text-[#1a1a2e] text-sm">{application.company}</p>
      <p className="text-gray-500 text-xs mt-0.5">{application.role}</p>

      {/* Notes preview — only shown if notes exist */}
      {application.notes && (
        <p className="text-gray-400 text-xs mt-2 line-clamp-1">{application.notes}</p>
      )}

      <div className="border-t border-gray-100 my-3" />

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{formatDate(application.dateApplied)}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_STYLES[application.status]}`}>
          {application.status}
        </span>
      </div>

      {/* Mobile quick-move — only rendered in mobile drawer view */}
      {isMobile && (
        <div className="mt-3">
          <button
            onClick={toggleMover}
            className="w-full text-xs text-gray-400 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition-colors"
          >
            Move to →
          </button>

          {showMover && (
            <div className="flex flex-wrap gap-2 mt-2">
              {ALL_STATUSES.filter(s => s !== application.status).map(status => (
                <button
                  key={status}
                  onClick={(e) => handleMove(e, status)}
                  className={`text-xs text-white px-3 py-1 rounded-full ${STATUS_COLORS[status]}`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
