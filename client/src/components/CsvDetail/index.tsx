import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type TParams = { id : string };

export default function CsvPage({ match } : RouteComponentProps<TParams>) {
  return <h1>CsvPage: {match.params.id}</h1>
}
