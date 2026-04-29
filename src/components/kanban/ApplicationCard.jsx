// Formats a date string to e.g. 'Apr 25, 2025'
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const BADGE_STYLES = {
    Applied: 'bg-indigo-100 text-indigo-600', 
    Interviewing: 'bg-amber-100 text-amber-600',
    Offered: 'bg-emerald-100 text-emerald-600',
    Rejected: 'bg-red-100 text-red-600',
}

export default function ApplicationCard({ application, onClick }) {
    // Store the application ID in the drag event so the column knows what was dropped
    function handleDragStart(e) {
        e.dataTransfer.setData('appId', application._id)
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={onClick}
            className='bg-white rounded-xl p-4 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow'
        >
            {/* Company + role */}
            <p className='font-semibold text-[#1a1a2e] text-sm'>{application.company}</p>
            <p className='text-gray-500 text-xs mt-0.5'>{application.role}</p>

            {/* Divider */}
            <div className='border-t border-gray-100 my-3' />

            {/* Date + status badge */}
            <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-400'>{formatDate(application.dateApplied)}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_STYLES[application.status]}`}>
                    {application.status}
                </span>
            </div>
        </div>
    )
}