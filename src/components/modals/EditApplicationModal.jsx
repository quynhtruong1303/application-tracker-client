import { useState } from 'react'
import { apiFetch } from '../../api/client'

export default function EditApplicationModal({ application, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState({
    company: application.company,
    role: application.role,
    jobURL: application.jobURL || '',
    status: application.status,
    recruiterContact: application.recruiterContact || '',
    notes: application.notes || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const updated = await apiFetch(`/applications/${application._id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      })
      onUpdate(updated)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      await apiFetch(`/applications/${application._id}`, { method: 'DELETE' })
      onDelete(application._id)
      onClose()
    } catch (err) {
      setError(err.message)
      setConfirming(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Edit modal */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a1a2e]">Edit Application</h2>
            <button
              onClick={() => setConfirming(true)}
              className="text-sm text-red-400 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              placeholder="Company *"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              placeholder="Role *"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="url"
              name="jobURL"
              value={form.jobURL}
              onChange={handleChange}
              placeholder="Job URL"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offered</option>
              <option>Rejected</option>
            </select>
            <input
              type="text"
              name="recruiterContact"
              value={form.recruiterContact}
              onChange={handleChange}
              placeholder="Recruiter contact"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
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
                className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete confirmation popup — renders on top of the edit modal */}
      {confirming && (
        <div className="fixed inset-0 flex items-center justify-center z-60 px-4">
          <div className="bg-red-50 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
            <p className="text-lg font-semibold text-[#1a1a2e] mb-2">Delete application?</p>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently remove <span className="font-medium text-[#1a1a2e]">{application.company}</span> — {application.role}.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 py-3 rounded-xl border border-red-200 text-sm font-medium text-gray-500 hover:bg-red-100 transition"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
