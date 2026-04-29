import { useState, useEffect } from 'react'
import { getCompanyNotes } from '../api/companyNotes.js'
import CompanyNoteCard from '../components/notes/CompanyNoteCard'
import AddCompanyNoteModal from '../components/notes/AddCompanyNoteModal'
import EditCompanyNoteModal from '../components/notes/EditCompanyNoteModal'

export default function CompanyNotesPage() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)

    useEffect(() => {
        getCompanyNotes()
            .then(setNotes)
            .catch(() => setError('Failed to load notes'))
            .finally(() => setLoading(false))
    }, [])

    function handleAdd(newNote) {
        setNotes(prev => [newNote, ...prev])
        setShowAddModal(false)
    }

    function handleUpdate(updatedNote) {
        setNotes(prev => prev.map(n => n._id === updatedNote._id ? updatedNote : n))
        setSelectedNote(null)
    }

    function handleDelete(id) {
        setNotes(prev => prev.filter(n => n._id !== id))
        setSelectedNote(null)
    }

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Loading notes...</p>
        </div>
    )

    if (error) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-red-400">{error}</p>
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1a1a2e]">Company Notes</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer"
                >
                    + Add Note
                </button>
            </div>

            {/* Empty state */}
            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <p className="text-lg font-medium mb-1">No company notes yet</p>
                    <p className="text-sm">Add your first note to start tracking companies</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map(note => (
                        <CompanyNoteCard
                            key={note._id}
                            note={note}
                            onClick={() => setSelectedNote(note)}
                        />
                    ))}
                </div>
            )}

            {showAddModal && (
                <AddCompanyNoteModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAdd}
                />
            )}

            {selectedNote && (
                <EditCompanyNoteModal
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}
