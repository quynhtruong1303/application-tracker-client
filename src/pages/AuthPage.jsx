import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api/client'

export default function AuthPage() {
    const { login } = useAuth()

    // Toggle between 'login' and 'register' modes
    const [mode, setMode] = useState('login')
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const body = mode === 'login'
                ? { email: form.email, password: form.password }
                : { name: form.name, email: form.email, password: form.password }
            
            const data = await apiFetch(`/auth/${mode}`, {
                method: 'POST',
                body: JSON.stringify(body),
            })

            // Save token and transition into the app
            login(data.token)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-[#f8f8fa] flex items-center justify-center px-4'>
            <div className='bg-white rounded-3xl shadow-lg p-10 w-full max-w-md'>

                {/* Header */}
                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-[#1a1a2e] tracking-tight'>AppTrack</h1>
                    <p className='text-gray-500 mt-2 text-sm'>
                        {mode === 'login' ? 'Welcome back.' : 'Start tracking your job search.'}
                    </p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    {/* Name field - only shown in register mode */}
                    {mode === 'register' && (
                        <input
                            type='text'
                            name='name'
                            placeholder='Full Name'
                            value={form.name}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                        />
                    )}

                    {/* Email field */}
                    <input 
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    />

                    {/* Password field */}
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    />

                    {/* Error message */}
                    {error && (
                        <p className='text-red-500 text-sm text-center'>{error}</p>
                    )}

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50'
                    >
                        {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create Account'}
                    </button>
                </form>

                {/* Toggle between login and register */}
                <p className='text-center text-sm text-gray-500 mt-6'>
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => { 
                            setMode(mode === 'login' ? 'register' : 'login')
                            setError('')
                        }}
                        className='text-indigo-500 hover:text-indigo-600 font-medium underline transition-colors cursor-pointer'
                    >
                        {mode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                </p>
                
            </div>
        </div>
    )
}