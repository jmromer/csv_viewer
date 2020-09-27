import CsvDetail from 'components/CsvDetail';
import CsvList from 'components/CsvList';
import React from 'react';
import { Route, Switch } from 'react-router-dom';


export default function AppRouter() {
  return (
    <Switch>
      <Route path="/csv/:id" component={CsvDetail} />
      <Route path="/" component={CsvList} />
    </Switch>
  )
}
