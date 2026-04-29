import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import StatsCard from '../components/stats/StatsCard'

// Maps each status to its accent color
const STATUS_COLORS = {
  Applied: "#6366f1",
  Interviewing: "#f59e0b",
  Offered: "#10b981",
  Rejected: "#ef4444",
}

// The order we want the cards to appear in
const STATUS_ORDER = ['Applied', 'Interviewing', 'Offered', 'Rejected']

export default function StatsPage() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await apiFetch('/applications/stats')
        setStats(data)
      } catch (err) {
        setError('Failed to load stats.')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-400'>
        Loading stats...
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-64 text-red-400'>
        {error}
      </div>
    )
  }

  // Turn the array from the API into a lookup object: { Applied: 5, Interviewing: 2,... }
  const countByStatus = stats.reduce((acc, item) => {
    acc[item._id] = item.count
    return acc
  }, {})

  const total = Object.values(countByStatus).reduce((sum, n) => sum + n, 0)

  return (
    <div className='max-w-4xl mx-auto px-6 py-10'>
      <h1 className='text-2xl font-bold text-[#1a1a2e] mb-1'>
        Your Job Search
      </h1>
      <p className='text-gray-500 mb-8'>
        {total} application{total !== 1 ? 's' : ''} tracked
      </p>

      {/* Stats cards */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10'>
        {STATUS_ORDER.map((status) => (
          <StatsCard
            key={status}
            label={status}
            count={countByStatus[status] ?? 0}
            color={STATUS_COLORS[status]}
          />
        ))}
      </div>

      {/* Visual Breakdown Bar */}
      {total > 0 && (
        <div>
          <p className='text-sm font-medium text-gray-500 mb-2'>Breakdown</p>
          <div className='flex rounded-full overflow-hidden h-4'>
            {STATUS_ORDER.map((status) => {
              const count = countByStatus[status] ?? 0
              const pct = (count / total) * 100
              if (pct ===0) return null
              return (
                <div
                  key={status}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: STATUS_COLORS[status],
                  }}
                  title={`${status}: ${count}`}
                />
              )
            })}
          </div>

          {/* Legend */}
          <div className='flex flex-wrap gap-4 mt-4'>
            {STATUS_ORDER.map((status) => {
              const count = countByStatus[status] ?? 0
              const pct = total > 0? Math.round((count / total) * 100) : 0
              return (
                <div key={status} className='flex items-center gap-1.5'>
                  <span 
                    className='w-2.5 h-2.5 rounded-full'
                    style={{ backgroundColor: STATUS_COLORS[status] }}
                  />
                  <span className='text-xs text-gray-500'>
                    {status} ({pct}%)
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
