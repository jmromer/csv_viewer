import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { DataGrid } from '@material-ui/data-grid'
import SaveIcon from '@material-ui/icons/Save'
import api from 'api'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type RouteParams = {
  id : string
}

interface CsvDetails {
  info ?: any
  data ?: any
  aggregations ?: any
}

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    table: {
      height: 400,
      backgroundColor: '#fff',
    }
  }),
)

export default function CsvPage({ match } : RouteComponentProps<RouteParams>) {
  const classes = useStyles()
  const { params: { id: csvId } } = match
  const [csvDetails, setCsvDetails] = useState({})

  const fetchCsvDetails = useCallback(async (csvId) => {
    try {
      const resp = await api.csvDetails(csvId)
      setCsvDetails(resp)
    } catch {
      setCsvDetails({})
    }
  }, [])

  useEffect(() => {
    fetchCsvDetails(csvId)
  }, [fetchCsvDetails, csvId])

  const { info, data, aggregations } = csvDetails as CsvDetails
  return !info
    ? <CircularProgress />
    : (
      <Container maxWidth="md">
        <Typography variant="h5" className={classes.title}>
          File info
        </Typography>
        {
          <>
            <div>Name: {info.name}</div>
            <div>Created: {info.created_at}</div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '10px auto' }}
              startIcon={<SaveIcon />}
              href={info.file}
              target="_blank"
            >
              Save
          </Button>
          </>
        }

        <Typography variant="h5" className={classes.title}>
          Data
        </Typography>
        <div className={classes.table}>
          <DataGrid columns={data.columns} rows={data.rows} pageSize={100} />
        </div>

        <Typography variant="h5" className={classes.title}>
          Aggregations
        </Typography>
        {
          Object.keys(aggregations).map(key => (
            <React.Fragment key={key}>
              <Typography variant="h6" className={classes.title}>
                {aggregations[key].name}
              </Typography>
              <div className={classes.table}>
                <DataGrid {...aggregations[key].data} pageSize={10} />
              </div>
            </React.Fragment>
          ))
        }
      </Container >
    )
}
