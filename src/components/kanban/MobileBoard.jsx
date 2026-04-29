import { useState } from 'react'
import ApplicationCard from './ApplicationCard'

const STATUSES = ['Applied', 'Interviewing', 'Offered', 'Rejected']

const DRAWER_STYLES = {
  Applied:      { header: 'bg-indigo-500',  border: 'border-indigo-200'  },
  Interviewing: { header: 'bg-amber-400',   border: 'border-amber-200'   },
  Offered:      { header: 'bg-emerald-500', border: 'border-emerald-200' },
  Rejected:     { header: 'bg-red-400',     border: 'border-red-200'     },
}

export default function MobileBoard({ applications, onCardClick, onMove }) {
  return (
    <div className='flex flex-col gap-3'>
      {STATUSES.map(status => (
        <Drawer
          key={status}
          status={status}
          applications={applications.filter(app => app.status === status)}
          onCardClick={onCardClick}
          onMove={onMove}
        />
      ))}
    </div>
  )
}

function Drawer({ status, applications, onCardClick, onMove }) {
  const [isOpen, setIsOpen] = useState(false)
  const styles = DRAWER_STYLES[status]

  return (
    <div className={`rounded-2xl border ${styles.border} overflow-hidden`}>

      {/* Drawer header — tap to collapse/expand */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full ${styles.header} px-4 py-3 flex items-center justify-between`}
      >
        <span className='text-white font-semibold text-sm'>{status}</span>
        <div className='flex items-center gap-2'>
          <span className='bg-white/30 text-white text-xs font-medium px-2 py-0.5 rounded-full'>
            {applications.length}
          </span>
          {/* Chevron rotates to point up when open */}
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      </button>

      {/* Cards — hidden when collapsed */}
      {isOpen && (
        <div className='flex flex-col gap-3 p-3 bg-white'>
          {applications.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-6 rounded-xl border-2 border-dashed border-gray-200 text-gray-400'>
              <p className='text-xs'>No applications</p>
            </div>
          ) : (
            applications.map(app => (
              <ApplicationCard
                key={app._id}
                application={app}
                onClick={() => onCardClick(app)}
                onMove={onMove}
                isMobile
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
