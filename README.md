csv_viewer
==========

Requirements
------------

If using `asdf` version manager, install the following by issuing `asdf install`
at the project root:

- Python 3
- Node.js
- PostgreSQL (use `pg_ctl start` to start)
- Redis (use `redis-server` to start)

Dependencies
------------

### API

- Django
- Django REST Framework
- Pandas
- Pytest

### Web client

- React
- React Router
- TypeScript
- Webpack
- Material UI
- Jest

Setup
-----

Issue `bin/setup` from the project root to install dependencies. The setup
script assumes the minimal requirements above are installed and running and
will:

1. Create and activate a virtualenv at the project root
2. Install Python dependencies
3. Create a `.env` file to set development-mode config variables
4. Create and migrate the database
5. Install npm dependencies
6. Build assets
7. Start the development server at http://127.0.0.1:8000

To tear down setup, use `bin/setup --down`.

Apps
-----

The project contains the following apps:

- `core`: container for project settings and middleware
- `api`: a CSV file browser API
- `client`: a React web client

Endpoints
---------

```
GET    /                    service root (serves a bare template that loads React app)
GET    /api/                api-root (browseable API docs)
GET    /api/csv-files/      list csv files
POST   /api/csv-files/      create a csv file
GET    /api/csv-files/:id/  get a csv file
DELETE /api/csv-files/:id/  delete a csv file
GET    /uploads/<path>      csv download
```

Model
-------

A `CsvFile` model is used to store uploaded CSVs and prevent the storage of
duplicates.

```py
# api/models.py L10-15 (bbfe0fd9)

class CsvFile(models.Model):
    name = models.CharField(max_length=256)
    digest = models.CharField(max_length=128, unique=True)
    file = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```
<sup>[[source](https://github.com/jmromer/csv_viewer/blob/bbfe0fd9/api/models.py#L10-L15)]</sup>

Data Processing
---------------

When viewing details for a given CSV, Pandas is used to clean the data and
perform aggregations efficiently.

```py
# api/services.py L8-22 (890c78ce)

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
```
<sup>[[source](https://github.com/jmromer/csv_viewer/blob/890c78ce/api/services.py#L8-L22)]</sup>

Results are cached to prevent inefficient recomputation:

```py
# api/views.py L48-61 (f8b30f3e)

def retrieve(self, request, pk=None, format=None):
    try:
        data = cache.get(f'csv:{pk}')
        if not data:
            # . . .
            cache.set(f'csv:{pk}', data)
        return Response(data)
```
<sup>[[source](https://github.com/jmromer/csv_viewer/blob/f8b30f3e/api/views.py#L48-L61)]</sup>

Components
----------

In the client app, `AppRouter` handles navigation to the main views, `CsvList`
and `CsvDetail`:

```tsx
// client/src/components/AppRouter/index.tsx L9-12 (8d1eb8aa)

<Switch>
  <Route path='/csv/:id' component={CsvDetail} />
  <Route path='/' component={CsvList} />
</Switch>
```
<sup>[[source](https://github.com/jmromer/csv_viewer/blob/8d1eb8aa/client/src/components/AppRouter/index.tsx#L9-L12)]</sup>

State is managed with `useState` and `useCallback` hooks.

```tsx
// client/src/components/CsvList/index.tsx L32-46 (8d1eb8aa)

export default function CsvList() {
  const classes = useStyles()
  const [csvList, setCsvList] = useState([])
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)

  const fetchCsvList = useCallback(async () => {
    try {
      const resp = await api.csvList()
      setCsvList(resp)
    } catch {
      setCsvList([])
    }
  }, [])

  useEffect(() => { fetchCsvList() }, [fetchCsvList])
```
<sup>[[source](https://github.com/jmromer/csv_viewer/blob/8d1eb8aa/client/src/components/CsvList/index.tsx#L32-L46)]</sup>


Demo
-----

![demo](data/demo.gif)

Work in Progress
----------------

- Deployment
- Automated testing
- Smarter cookie parsing
- Multiple file upload handling
