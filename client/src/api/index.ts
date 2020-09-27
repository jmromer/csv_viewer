import axios from 'axios'

export interface CsvFile {
  id : number;
  url : string;
  file : string;
  name : string;
  created_at : string;
}

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 1000,
});

async function csvList() {
  try {
    const resp = await api.get('/csv-files')
    return resp.data.csv_files
  } catch {
    return { 'errors': ['Failed retrieving csv list.'] }
  }
}

async function csvFind(id : number) {
  try {
    const resp = await api.get(`/csv-files/${id}`)
    return resp.data.csv_file
  } catch {
    return { 'errors': [`Failed retrieving csv with id ${id}.`] }
  }
}

async function csvCreate(file : string) {
  try {
    await api.post(
      '/csv-files',
      { 'file': file }, // TODO: Fix data headers, csrf
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return { 'result': 'success' }
  } catch {
    return { 'errors': ['Failed uploading csv.'] }
  }
}

export default { csvList, csvCreate, csvFind }
