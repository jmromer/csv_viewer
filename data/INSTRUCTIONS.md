CSV Web Application
===================

Goal
----

Design a full stack web application to handle CSV data.

Purpose
-------

The assignment is very open by design, the intent is to give you an opportunity
to showcase your skills and demonstrate techniques you like to use.

Estimated duration
------------------

3-6 hours, however there is no min/max duration

Requirements
------------

The application should have the ability to:

- Upload a CSV file
- List uploaded CSV files
- Download the previously uploaded CSV file
- Display the CSV content showing at least all column headers and content
- Provide statistics on the number of people with the same year in the "date"
  field.

The application should be comprised of both a front-end and a back-end. The
front-end must have at least three buttons, allowing for upload download and
date statistics.

Notes
-----

- The application can be written in any language
- The CSV will be comma delimited
- The CSV file may contain empty string in the 'state' column. In this case,
  fill in with the text "BLANK" instead
- The application should be able to run on any machine
- We do not impose restrictions on what technology stack you wish to use,
  however the technical stack we use is python back-end framework and JS
  front-end framework

Data
----

```csv
guid, name,              first,    last,     email,             value, date,       phone,          age, state, street
84d4, Eddie Sanders,     Ralph,    Guerrero, mod@opoza.mk,      value, 2/19/2018,  (327) 825-1283, 36,  MD,    Nohuta Heights
6d30, Lillian Glover,    Franklin, Rose,     et@wuco.nu,        value, 9/25/2050,  (538) 335-1854, 59,  VT,    Wefi Circle
ff07, Rosetta Crawford,  Erik,     Hunter,   so@ni.cr,          value, 12/1/1958,  (467) 550-8810, 37,  NV,    Saman Court
4377, Maggie Shelton,    Troy,     King,     vemakriz@bejzi.mp, value, 10/10/1943, (380) 542-2786, 39,  PA,    Ropa View
adf9, Melvin Jenkins,    Frances,  Blake,    esfaf@gan.gf,      value, 11/12/2070, (822) 250-6066, 25,  MS,    Avoefi Plaza
52b2, Lena Patrick,      Philip,   Nelson,   bonegnup@obi.by,   value, 3/12/1996,  (958) 707-9065, 19,  KY,    Kekiv Mill
5f3f, Christopher Klein, Mayme,    Terry,    ewnid@dihsavow.fo, value, 10/20/1903, (459) 970-5795, 53,  RI,    Gimu Turnpike
f2a0, Georgie Marshall,  Duane,    Hodges,   ihu@ri.gq,         value, 10/26/1919, (704) 651-4168, 18,  LA,    Jicboc Center
2133, Alberta Owen,      Ruth,     Kennedy,  menvud@pawuiju.sb, value, 9/18/1987,  (568) 261-4302, 49,  SD,    Pagod Mill
```
