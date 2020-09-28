import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import { useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TocIcon from '@material-ui/icons/Toc'
import ListItemLink from 'components/ListItemLink'
import React from 'react'
import useStyles from 'styles'

interface DrawerHandler {
  (): void
}

interface AppDrawerProps {
  drawerIsOpen: boolean
  handleDrawerClose: DrawerHandler
}

export default function AppDrawer(props: AppDrawerProps) {
  const theme = useTheme()
  const classes = useStyles()
  const { drawerIsOpen, handleDrawerClose } = props

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={drawerIsOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItemLink icon={<TocIcon />} primary='All CSVs' to='/list' />
      </List>
    </Drawer>
  )
}
