import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import AppBar from '../AppBar'
import AppRouter from '../AppRouter'
import useStyles from '../../styles'

export default function App() {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar />
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  )
}
