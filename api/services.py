from collections import namedtuple

import pandas as pd

CsvData = namedtuple('CsvData', ['table', 'aggregations'])


def parse_csv(csv_file):
    """
    Load the given `csv_file` into a Pandas DataFrame, clean data, calculate
    statistics. Return a CsvData object.
    """
    csv_df = pd.read_csv(csv_file.file)
    csv_table = cleaned_data_table(csv_df)
    count_by_year = count_by_year_table(csv_df)
    aggregations = {
        'count_by_year': {
            'name': 'Count by year',
            'data': count_by_year,
        }
    }
    return CsvData(table=csv_table, aggregations=aggregations)


def cleaned_data_table(df):
    """
    Fill NAs in the given DataFrame `df`'s `state` column.
    Return a table representation as a dict with "columns" and "data" keys.
    """
    df = df.copy()
    df['state'] = df['state'].fillna('BLANK')
    # TODO: Compute and add width for each column
    columns = [{'field': col} for col in df.columns]
    df['id'] = df.index
    return {
        'columns': columns,
        'rows': df.to_dict(orient='records'),
    }


def count_by_year_table(df):
    """
    Group by year and sum-aggregate records in `df`.
    Return a table representation as a dict with "columns" and "data" keys.
    """
    def parsed_year(row_num):
        """
        Return the year for the given row number `row_num` in DataFrame
        `df`. As a performance optimization, assume a stable date format
        (d/m/YYYY) and split the string instead of converting to datetime.
        """
        return df.at[row_num, 'date'].split('/')[-1]

    df = df.copy()
    # group by year, sum rows
    df = df.groupby(parsed_year).sum().reset_index()
    df.columns = ('year', 'count')
    # TODO: Compute and add width for each column
    columns = [{'field': col} for col in df.columns]
    df['id'] = df.index
    return {
        'columns': columns,
        'rows': df.to_dict(orient='records'),
    }
