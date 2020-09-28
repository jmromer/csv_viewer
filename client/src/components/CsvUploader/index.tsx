import TableChartIcon from '@material-ui/icons/TableChart';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

interface CsvUploaderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CsvUploader(props: CsvUploaderProps) {
  const { open, setOpen } = props

  function handleSave(e: any) {
    console.log(e)
  }

  return (
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
  )
}
