import MuiTopBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import useStyles from 'styles';

interface DrawerHandler {
  () : void
}

interface AppBarProps {
  drawerIsOpen : boolean;
  handleDrawerOpen : DrawerHandler;
}

export default function AppBar(props : AppBarProps) {
  const classes = useStyles();
  const { drawerIsOpen, handleDrawerOpen } = props

  return (
    <MuiTopBar
      position="fixed"
      className={clsx(classes.appBar, { [classes.appBarShift]: drawerIsOpen })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, drawerIsOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          CSV Browser
        </Typography>
      </Toolbar>
    </MuiTopBar>
  )
}
