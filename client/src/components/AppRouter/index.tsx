import AppHome from 'components/AppHome';
import CsvDetail from 'components/CsvDetail';
import CsvList from 'components/CsvList';
import CsvUpload from 'components/CsvUpload';
import React from 'react';
import { Route, Switch } from 'react-router-dom';


export default function AppRouter() {
  return (
    <Switch>
      <Route path="/list" component={CsvList} />
      <Route path="/upload" component={CsvUpload} />
      <Route path="/csv/:id" component={CsvDetail} />
      <Route path="/" component={AppHome} />
    </Switch>
  )
}
