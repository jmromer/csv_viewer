import React from 'react'
import { Route, Switch } from 'react-router-dom'

import CsvDetail from '../CsvDetail'
import CsvList from '../CsvList'

export default function AppRouter() {
  return (
    <Switch>
      <Route path='/csv/:id' component={CsvDetail} />
      <Route path='/' component={CsvList} />
    </Switch>
  )
}
