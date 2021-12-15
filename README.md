# Course Friction Explorer

## Project Overview

Our project is divided up into a frontend and a backend component. 
Our frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In particular, we use React components from Materials UI, applying customized CSS via styled components. For frontend state management, we use [Redux](https://redux.js.org/), which gives all our individual components access to a consistent global state. For data visualizations, we use [D3](https://d3js.org/).


In our backend, we used [Fast API](https://fastapi.tiangolo.com/) and [Uvicorn](https://www.uvicorn.org/) to serve the REST APIs defined for our project. 
The raw dataset is in a `.sqlite` format, which we load internally into our own data structures. 
To access the different attributes we defined, we implemented a domain-specific language (DSL) specifically for querying data from our backend. 
The instructions for using our DSL can be found [here](https://github.students.cs.ubc.ca/tokaeo/course-explorer/wiki/Cheatsheet).

The DSL parser and lexer were generated from our grammar using [Antlr](https://www.antlr.org/), an automatic parser generator. 
We wrote the DSL grammar in `DSLGrammar.g4`, with which Antlr uses to generate the lexer and parser files.
Then, we implemented the visitors found in the `dsl` directory to evaluate each DSL query for our dataset.


Here is a tree overview of the project structure, with some annotations about what each directory or file means.

course-explorer
- `backend`
  - `antlr/` ← DSL related files (auto-generated except `DSLGrammar.g4`)
  - `api/` ← For serving the API (with FastAPI)
  - `data/`
    - `model/` ← Modelling the different attributes assessible to the user
    - `friction.sqlite` ← Raw data
    - ... ← Some Python files to load the data into the backend with SQL queries
  - `db/` ← Raw data
  - `dsl/` ← For traversing and evaluating the DSL
  - `schemas/` ←  Defines interface for interacting with the dataset and queries
  - `main.py` ← Starts the server (using Uvicorn)
  - ... ← Files for dependency management (using Pipenv)
- `frontend/`
  - `public/`  ← automatically generated
  - `src/`
    - `components/` ← uses D3 and React to define visualization components
      - `CircularPacking/` ← Defines circular packing components for the pages (uses D3 and React)
      - .../ ← Defines other smaller components for the pages
    - `pages/`
      - `IndicatorsBoard/` ← Defines the indicators board page
      - `Overview/` ← Defines the overview page
    - `services/` ← for API
    - `states/` ← states for data (uses Redux)
    - `App.tsx`
    - `index.tsx` ← the usual App and index files to define the overall appearance
    - ...
  - ... ← Files for managing project dependencies (with yarn package manager)
  
## Dependencies

These are the dependencies that will not be automatically installed on your machine. Crucially, our code relies on the latest version of Python, Python 3.10 (for match-case statements). The rest will be handled by package managers, but those managers should also be installed prior to following the instructions below.

- Python 3.10
- Pip
- Pipenv
- Npm
- Yarn

## Running the Application
To run our app, run both the backend and the frontend.

### 1. Run the backend

Navigate to the backend directory:
```bash
cd backend
```
The backend have python library dependencies managed by
[pipenv](https://pipenv-fork.readthedocs.io/en/latest/). 
You will need `python`, `pip` and `pipenv` installed on your machine prior to 
developing and running the backend locally.

Once `pipenv` is installed, you can run
```bash
pipenv install
```
to install all required dependencies of the backend into a new virtual environment.

Then, to run scripts within the environment, start a pipenv shell within the `backend` directory with:
```bash
pipenv shell
```

The server API is built using [Fast API](https://fastapi.tiangolo.com/).

Then, in the `backend` directory, you can run:

```uvicorn main:app```

Starts the backend application serving the REST APIs. Run with `--reload` flag to enable auto-restart after code changes. Only do this for development.
Open http://localhost:8000 to hit the root endpoint.
Open http://localhost:8000/docs for REST API documentations.


### 2. Run the frontend

Navigate to the frontend directory:
```bash
cd frontend
```

The frontend has dependencies managed by
[yarn](https://classic.yarnpkg.com/en/docs/getting-started).
You will need `yarn` and `npm` installed on your machine prior to 
developing and running the frontend locally.

Once `yarn` is installed, run the following to install dependencies:
```bash
yarn install
yarn lint --fix
```

Finally, start the application with,
```bash
yarn start
```
which should open a new tab to http://localhost:3000 automatically.

## DSL Cheatsheet

https://github.students.cs.ubc.ca/tokaeo/course-explorer/wiki/Cheatsheet

## Demo Video

- 