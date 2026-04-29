import ApplicationCard from './ApplicationCard'

const STATUSES = ['Applied', 'Interviewing', 'Offered', 'Rejected']

const DRAWER_STYLES = {
    Applied:      { header: 'bg-indigo-500',  border: 'border-indigo-200' },
  Interviewing: { header: 'bg-amber-400',   border: 'border-amber-200'  },
  Offered:      { header: 'bg-emerald-500', border: 'border-emerald-200'},
  Rejected:     { header: 'bg-red-400',     border: 'border-red-200'    },
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
    const styles = DRAWER_STYLES[status]

    return (
        <div className={`rounded-2xl border ${styles.border} overflow-hidden`}>

            {/* Drawer header */}
            <div className={`${styles.header} px-4 py-3 flex items-center justify-between`}>
                <span className='text-white font-semibold text-sm'>{status}</span>
                <span className='bg-white/30 text-white text-xs font-medium px-2 py-0.5 rounded-full'>
                    {applications.length}
                </span>
            </div>

            {/* Card */ }
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
        </div>
    )
}