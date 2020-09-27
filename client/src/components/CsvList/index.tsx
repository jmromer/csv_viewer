import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CsvLinkItem from 'components/CsvLinkItem';
import React from 'react';

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

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" className={classes.title}>
        Available CSV Files
      </Typography>

      <div className={classes.demo}>
        <List dense={false} className={classes.list}>
          <CsvLinkItem
            to="/csv/1"
            primary={'filename.csv'}
            secondary={'8/3/2020'}
          />
        </List>
      </div>
    </Container>
  )
}
