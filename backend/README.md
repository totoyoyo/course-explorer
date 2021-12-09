The backend have python library dependencies managed by [pipenv](https://pipenv-fork.readthedocs.io/en/latest/). You will need `python`, `pip` and `pipenv` installed on your machine prior to developing and running the backend locally.

Once `pipenv` is installed, you can run:
```
$ pipenv install
```
to install all required dependencies of the backend.

Then, to run scripts within the environment, start a pipenv shell with:
```
$ pipenv shell
```

The server API is built using [Fast API](https://fastapi.tiangolo.com/).

## Available Scripts

In the project directory, you can run:

### `uvicorn main:app`

Starts the backend application serving the REST APIs. Run with `--reload` flag to enable auto-restart after code changes. Only do this for development.
Open http://localhost:8000 to hit the root endpoint.
Open http://localhost:8000/docs for REST API documentations.
