import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CsvLinkItem from 'components/CsvLinkItem';
import React, { useState, useEffect, useCallback } from 'react';
import api, { CsvFile } from 'api'

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
      color: '#000',
    },
    list: {
      backgroundColor: '#424242',
      color: '#fff'
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

export default function CsvList() {
  const classes = useStyles();
  const [csvList, setCsvList] = useState([]);

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
    <Container maxWidth="sm">
      <Typography variant="h6" className={classes.title}>
        Available CSV Files
      </Typography>

      <div className={classes.demo}>
        <List dense={false} className={classes.list}>
          {csvList.map((csv : CsvFile) => (
            <CsvLinkItem
              to={`/csv/${csv.id}`}
              primary={csv.name}
              secondary={csv.created_at}
            />
          ))}
        </List>
      </div>
    </Container>
  )
}
