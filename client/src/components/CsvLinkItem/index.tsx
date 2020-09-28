import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import TableChartIcon from '@material-ui/icons/TableChart'
import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import api from '../../api'

const useStyles = makeStyles(_ =>
  createStyles({
    listItemText: {
      '& p': {
        color: 'rgba(235, 235, 235, 0.45)'
      }
    },
    tableChart: {
      color: '#000'
    },
    trashCan: {
      color: '#fff'
    }
  })
)

interface CsvLinkItemProps {
  id: number
  primary: string
  secondary?: string
  to: string
}

export default function CsvLinkItem(props: CsvLinkItemProps) {
  const { id, primary, secondary, to } = props
  const classes = useStyles()

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )

  async function handleDelete(id: number) {
    const resp = await api.csvDelete(id)

    if (resp.success) {
      window.location.replace('/') // TODO: Fix this
    } else {
      console.error(resp.errors)
    }
  }

  return (
    <ListItem button component={renderLink}>
      <ListItemAvatar>
        <Avatar>
          <TableChartIcon className={classes.tableChart} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={primary}
        secondary={secondary}
        className={classes.listItemText}
      />

      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(id)}>
          <DeleteIcon className={classes.trashCan} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
