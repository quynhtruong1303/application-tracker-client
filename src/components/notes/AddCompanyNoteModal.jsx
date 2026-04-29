import { useState } from 'react'
import { createCompanyNote } from '../../api/companyNotes.js'

const TEXTAREA_CLASS = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none'
const INPUT_CLASS = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'

export default function AddCompanyNoteModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        companyName: '',
        background: '',
        interviewTips: '',
        contacts: '',
        generalNotes: '',
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
            const newNote = await createCompanyNote(form)
            onAdd(newNote)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">New Company Note</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company name *"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                        className={INPUT_CLASS}
                    />

                    <textarea
                        name="background"
                        placeholder="Background — company mission, industry, size..."
                        value={form.background}
                        onChange={handleChange}
                        rows={3}
                        className={TEXTAREA_CLASS}
                    />

                    <textarea
                        name="interviewTips"
                        placeholder="Interview tips — process, past questions, format..."
                        value={form.interviewTips}
                        onChange={handleChange}
                        rows={3}
                        className={TEXTAREA_CLASS}
                    />

                    <textarea
                        name="contacts"
                        placeholder="Contacts — recruiter, hiring manager, referrals..."
                        value={form.contacts}
                        onChange={handleChange}
                        rows={2}
                        className={TEXTAREA_CLASS}
                    />

                    <textarea
                        name="generalNotes"
                        placeholder="General notes — anything else..."
                        value={form.generalNotes}
                        onChange={handleChange}
                        rows={2}
                        className={TEXTAREA_CLASS}
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Add Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
