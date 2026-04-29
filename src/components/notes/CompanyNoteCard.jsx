function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const SECTIONS = [
    { key: 'background', label: 'Background' },
    { key: 'interviewTips', label: 'Interview Tips' },
    { key: 'contacts', label: 'Contacts' },
    { key: 'generalNotes', label: 'Notes' },
]

export default function CompanyNoteCard({ note, onClick }) {
    // Only show sections that have content, up to 2
    const filledSections = SECTIONS.filter(s => note[s.key]?.trim()).slice(0, 2)

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            <p className="font-semibold text-[#1a1a2e] text-base">{note.companyName}</p>

            {filledSections.length > 0 ? (
                <div className="mt-3 space-y-2">
                    {filledSections.map(s => (
                        <div key={s.key}>
                            <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide">{s.label}</p>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{note[s.key]}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-gray-400 mt-2">No notes added yet</p>
            )}

            <div className="border-t border-gray-100 mt-4 pt-3">
                <p className="text-xs text-gray-400">Updated {formatDate(note.updatedAt)}</p>
            </div>
        </div>
    )
}
