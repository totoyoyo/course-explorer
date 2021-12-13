# Course Friction Explorer

## Project Overview

Blah blah blah we do this for this for that for

## Libraries
We wrote the DSL grammar in `DSLGrammar.g4`, with which Antlr uses to
generate the lexer and parser files.  Then, we implemented a visitor found in
the `dsl` directory to evaluate each DSL query, querying our dataset.


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
to install all required dependencies of the backend.

Then, to run scripts within the environment, start a pipenv shell with:
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
developing and running the backend locally.

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


## Live Demo  Video

Heres the url



- 