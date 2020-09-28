import Snackbar from '@material-ui/core/Snackbar'
import TableChartIcon from '@material-ui/icons/TableChart'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import api from 'api'
import { DropzoneDialog } from 'material-ui-dropzone'
import React, { SyntheticEvent, useState } from 'react'

interface CsvUploaderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function CsvUploader({ open, setOpen }: CsvUploaderProps) {
  const [errorsOpen, setErrorsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSave(files: File[]) {
    const resp = await api.csvCreate(files[0])

    if (resp.success) {
      setOpen(false)
      window.location.replace('/') // TODO: Fix this
    } else {
      setErrorMessage(resp.errors.join('\n'))
      setErrorsOpen(true)
    }
  }

  function handleErrorClose(event?: SyntheticEvent, reason?: string) {
    if (reason === 'clickaway') { return }
    setErrorsOpen(false)
  }

  return (
    <>
      <Snackbar
        open={errorsOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <DropzoneDialog
        acceptedFiles={['text/csv']}
        filesLimit={1}
        getPreviewIcon={() => <TableChartIcon />}
        maxFileSize={30_000_000}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        open={open}
        showFileNames={true}
        showPreviews={false}
        showPreviewsInDropzone={true}
      />
    </>
  )
}
