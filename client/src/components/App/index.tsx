import CssBaseline from '@material-ui/core/CssBaseline'
import clsx from 'clsx'
import AppBar from 'components/AppBar'
import AppDrawer from 'components/AppDrawer'
import AppRouter from 'components/AppRouter'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import useStyles from 'styles'

export default function App() {
  const classes = useStyles()

  // Drawer management
  const [isOpen, setIsOpen] = React.useState(false)
  const handleDrawerOpen = () => { setIsOpen(true) }
  const handleDrawerClose = () => { setIsOpen(false) }

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar drawerIsOpen={isOpen} handleDrawerOpen={handleDrawerOpen} />
        <AppDrawer drawerIsOpen={isOpen} handleDrawerClose={handleDrawerClose} />
        <main className={clsx(classes.content, { [classes.contentShift]: isOpen })}>
          <div className={classes.drawerHeader} />
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  )
}
