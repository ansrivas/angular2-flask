# angular2-flask

Simple angular2 app with python-flask backend (for learning angular2)

## Usage

1.  `backend` directory contains the flask backend with simple authentication methods

2.  `frontend` directory contains the angular2 frontend as explained in [angular-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)

## Installation instructions

1.  Clone the repo

    ```bash
    git clone --depth 1 https://github.com/ansrivas/angular2-flask.git
    cd angular2-flask
    ```

2.  Install and run backend in a terminal

    -   Server logs are stored in a directory named log_output

    ```bash
    cd backend
    sudo pip install -r requirements.txt
    python run.py
    ```

3.  Install frontend related dependencies

    -   Easiest way to handle node related dependencies is to install [nvm](https://github.com/creationix/nvm)
    -   Once you have node installed, install the project's dependencies

    ```bash
    cd front

    # install global dependencies
    npm install webpack-dev-server rimraf webpack typescript -g

    # install project related dependencies
    npm install

    # run server
    npm run server:dev:hmr
    ```

4.  Navigate to `http://localhost:3000`

5.  Default credential : `admin:admin`

### Docker support:

1. Build the docker backend

  ```bash
  cd backend
  docker build --no-cache  -t backend/python:latest .
  docker run -it -p 8081:8081 --name server backend/python
  ```
  To connect to the running container:
  ```bash
  docker exec -it server /bin/sh
  ```
2. Build the frontend

  ```bash
  cd front
  docker build --no-cache  -t frontend/angular2:latest .
  docker run -it -p 3000:8080 --name angular2-app frontend/angular2
  ```

3. Navigate to `http://localhost:3000`  

4. Easiest way to run this application to run `docker-compose up` in the project root directory.
