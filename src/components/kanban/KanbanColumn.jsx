import ApplicationCard from './ApplicationCard'

// Color config per status - header accent + background tint
const COLUMN_STYLES = {
    Applied: { header: 'bg-indigo-500', bg: 'bg-indigo-50', dot: 'bg-indigo-400' },
    Interviewing: { header: 'bg-amber-400', bg: 'bg-amber-50', dot: 'bg-amber-400' },
    Offered: { header: 'bg-emerald-500', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
    Rejected: { header: 'bg-red-400', bg: 'bg-red-50', dot: 'bg-red-400' },
}

export default function KanbanColumn({ status, applications, onDrop, onCardClick }) {
    const styles = COLUMN_STYLES[status]

    // Allow drop by preventing the default dragover behavior
    function handleDragOver(e) {
        e.preventDefault()
    }

    // Read the dragged card's ID and call onDrop with this column's status
    function handleDrop(e) {
        const appId = e.dataTransfer.getData('appId')
        onDrop(appId, status)
    }

    return (
        <div className={`flex flex-col rounded-2xl min-w-[260px] w-[260px] ${styles.bg}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
            {/* Column header */}
            <div className={`${styles.header} rounded-t-2xl px-4 py-3 flex items-center justify-between`}>
                <span className='text-white font-semibold text-sm'>{status}</span>
                <span className='bg-white/30 text-white text-xs font-medium px-2 py-0.5 rounded-full'>
                    {applications.length}
                </span>
            </div>

            {/* Cards container */}
            <div className='flex flex-col gap-3 p-3 flex-1'>
                {applications.length === 0 ? (
                    <div className='flex flex-col items-center justify-center mt-4 p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400'>
                        <p className='text-xs'>No applications</p>
                        <p className='text-xs'>Drop a card here</p>
                    </div>
                ) : (
                    applications.map(app => (
                        <ApplicationCard key={app._id} application={app} onClick={() => onCardClick(app)} />
                    ))
                )}
            </div>
        </div>
    )
}