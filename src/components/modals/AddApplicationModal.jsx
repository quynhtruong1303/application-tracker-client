import { useState } from 'react'
import { apiFetch } from '../../api/client'

export default function AddApplicationModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        company: '', 
        role: '',
        jobURL: '',
        status: 'Applied',
        recruiterContact: '',
        notes: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const newApp = await apiFetch('/applications', {
                method: 'POST', 
                body: JSON.stringify(form),
            })
            // Pass the new application back up so KanbanBoard can add it to state
            onAdd(newApp)
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        // Blurred dark overlay - clicking it closes the modal
        <div
            className='fixed inset-0 bg-black/40 backdrop-blue-sm flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0'
            onClick={onClose}
        >
            {/* Modal panel - stop clicks from building to overlay */}
            <div
                className='bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl'
                onClick={e => e.stopPropagation()}
            >
                <h2 className='text-xl font-bold text-[#1a1a2e] mb-6'>New Application</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <input
                        type='text'
                        name='company'
                        placeholder='Company *'
                        value={form.company}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    />

                    <input
                        type='text'
                        name='role'
                        placeholder='Role *'
                        value={form.role}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    />
                    
                    <input
                        type='url'
                        name='jobURL'
                        placeholder='Job URL'
                        value={form.jobURL}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    />

                    {/* Status dropdown */}
                    <select
                        name='status'
                        value={form.value}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    >
                        <option>Applied</option>
                        <option>Interviewing</option>
                        <option>Offered</option>
                        <option>Rejected</option>
                    </select>
                    
                    <input
                        type='text'
                        name='recruiterContact'
                        placeholder='Recruiter contact info'
                        value={form.recruiterContact}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                    />

                    <textarea
                        name='notes'
                        placeholder='Additional notes'
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none'
                    />

                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    <div className='flex gap-3 mt-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={loading}
                            className='flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-colors disabled:opacity-50'
                        >
                            {loading ? 'Adding...' : 'Add Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}