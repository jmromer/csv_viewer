import MuiTopBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TocIcon from '@material-ui/icons/Toc'
import React from 'react'

import ListItemLink from '../ListItemLink'
import useStyles from '../../styles'

export default function AppBar() {
  const classes = useStyles()
  return (
    <>
      <MuiTopBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' noWrap>
            CSV Browser
        </Typography>
        </Toolbar>
      </MuiTopBar>

      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <List>
          <ListItemLink
            icon={<TocIcon style={{ color: '#fff' }} />}
            primary='All CSVs'
            to='/list'
          />
        </List>
      </Drawer>
    </>
  )
}
