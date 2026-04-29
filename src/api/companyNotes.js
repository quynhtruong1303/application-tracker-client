import { apiFetch } from './client.js'

export const getCompanyNotes = () =>
    apiFetch('/company-notes')

export const createCompanyNote = (data) =>
    apiFetch('/company-notes', {
        method: 'POST',
        body: JSON.stringify(data)
    })

export const updateCompanyNote = (id, data) =>
    apiFetch(`/company-notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })

export const deleteCompanyNote = (id) =>
    apiFetch(`/company-notes/${id}`, {
        method: 'DELETE'
    })
