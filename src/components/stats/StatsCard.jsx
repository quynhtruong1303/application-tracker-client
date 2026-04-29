// A single stat tile - displays a status label, count, and accent color
export default function StatsCard({label, count, color }) {
    return (
        <div className='bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2'>

            {/* Colored dot + label */}
            <div className='flex items-center gap-2'>
                <span
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: color }}
                />
                <span className='text-sm font-medium text-gray-500'>{label}</span>
            </div>

            {/* Big count number */}
            <p className='text-4xl font-bold' style={{ color }}>
                { count }
            </p>

            <p className='text-xs text-gray-400'>applications</p>
        </div>
    )
}