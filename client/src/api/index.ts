import axios from 'axios'

export interface CsvFile {
  id: number
  url: string
  file: string
  name: string
  created_at: string
}

const api = axios.create({ baseURL: 'http://localhost:8000/api' })

// TODO: parse cookie intelligently
const csrfToken = document.cookie.split('=')[1]

async function csvCreate(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    await api.post('/csv-files/', formData, {
      headers: { 'X-CSRFToken': csrfToken }
    })
    return { 'success': true }
  } catch ({ response: { data: { errors } } }) {
    return { 'errors': errors }
  }
}

async function csvDelete(id: number) {
  try {
    await api.delete(`/csv-files/${id}/`, {
      headers: { 'X-CSRFToken': csrfToken }
    })
    return { 'success': true }
  } catch {
    return { 'errors': [`Failed deleting csv with id ${id}.`] }
  }
}

async function csvDetails(id: string) {
  try {
    const resp = await api.get(`/csv-files/${id}/`)
    return resp.data.csv_file
  } catch {
    return { 'errors': [`Failed retrieving csv with id ${id}.`] }
  }
}

async function csvList() {
  try {
    const resp = await api.get('/csv-files/')
    return resp.data.csv_files
  } catch {
    return { 'errors': ['Failed retrieving csv list.'] }
  }
}

export default {
  csvCreate,
  csvDelete,
  csvDetails,
  csvList
}
