import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useEffect, useState } from 'react'

import CsvLinkItem from '../CsvLinkItem'
import CsvUploader from '../CsvUploader'
import api, { CsvFile } from '../../api'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: '32px'
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      color: '#000'
    },
    list: {
      backgroundColor: '#424242',
      color: '#fff'
    },
    title: {
      margin: theme.spacing(4, 0, 2)
    }
  })
)

export default function CsvList() {
  const classes = useStyles()
  const [csvList, setCsvList] = useState([])
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)

  const fetchCsvList = useCallback(async () => {
    try {
      const resp = await api.csvList()
      setCsvList(resp)
    } catch {
      setCsvList([])
    }
  }, [])

  useEffect(() => { fetchCsvList() }, [fetchCsvList])

  return (
    <Container maxWidth='sm'>
      <CsvUploader open={isUploaderOpen} setOpen={setIsUploaderOpen} />

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant='h6' className={classes.title}>
            Available CSV Files
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => setIsUploaderOpen(true)}>
            Upload
          </Button>
        </Grid>
      </Grid>

      {
        !csvList.length
          ? <div style={{ textAlign: 'center' }}>No files found.</div>
          : (
            <div className={classes.demo}>
              <List dense={false} className={classes.list}>
                {csvList.map((csv: CsvFile) => (
                  <CsvLinkItem
                    key={csv.id}
                    id={csv.id}
                    to={`/csv/${csv.id}`}
                    primary={csv.name}
                    secondary={csv.created_at}
                  />
                ))}
              </List>
            </div>
          )
      }
    </Container>
  )
}
