import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 200;

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      color: '#fff'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      color: '#fff'
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#424242 !important',
      color: '#fff !important'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    drawerContainer: {
      overflow: 'auto'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
);
