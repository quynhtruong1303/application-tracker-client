import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthPage from './pages/AuthPage'
import KanbanPage from './pages/KanbanPage'
import StatsPage from './pages/StatsPage'

// Inner component so it can access useAuth() (must be inside AuthProvider)
function AppShell() {
  const { token, user, logout } = useAuth()
  const [view, setView] = useState('kanban')  // 'kanban' or 'stats'

  // If no token, show the login/register page
  if (!token) return <AuthPage />

  return (
    <div className='min-h-screen bg-[#f8f8fa]'>
      {/* Navbar */}
      <nav className='bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <span className='text-xl font-semibold text-[#1a1a2e] tracking-tight'>
            AppTrack
          </span>
          <div className='flex items-center gap-6'>
            {/* View switcher */}
            <div className='flex gap-1 bg-gray-100 rounded-full p-1'>
              <button
                onClick={() => setView('kanban')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === 'kanban'
                    ? 'bg-white text-[#1a1a2e] shadow-sm'
                    : 'text-gray-500 hover:text-[#1a1a2e]'
                }`}
              >
                Board
              </button>
              <button
                onClick={() => setView('stats')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === 'stats'
                    ? 'bg-white text-[#1a1a2e] shadow-sm'
                    : 'text-gray-500 hover:text-[#1a1a2e]'
                }`}
              >
                Stats
              </button>
            </div>
            <button
              onClick={logout}
              className='text-sm text-gray-500 hover:text-red-500 transition-colors'
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome banner */}
      {user && (
        <div className='max-w-7xl mx-auto px-6 pt-6'>
          <p className='text-[#1a1a2e] font-semibold text-lg'>
            Welcome back, {user.name.split(' ')[0]} 👋
          </p>
          <p className='text-gray-400 text-sm'>Here's your job search at a glance.</p>
        </div>
      )}

      {/* Page content */}
      <main className='max-w-7xl mx-auto px-6 py-8'>
        {view === 'kanban' ? <KanbanPage /> : <StatsPage />}
      </main>
    </div>
  )
}

// AuthProvider wraps everything so useAuth() works anywhere in the tree
export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}