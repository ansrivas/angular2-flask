# angular2-flask
---

| `Backend`        | `Frontend`           |
| :-------------: |:-------------:|
|[![DockerPulls](https://img.shields.io/docker/pulls/ansrivas/flask-backend.svg)](https://registry.hub.docker.com/u/ansrivas/flask-backend/)    | [![DockerPulls](https://img.shields.io/docker/pulls/ansrivas/angular2-frontend.svg)](https://registry.hub.docker.com/u/ansrivas/angular2-frontend/)      |
| [![Docker Build Statu](https://img.shields.io/docker/build/ansrivas/flask-backend.svg)]()     | [![Docker Build Statu](https://img.shields.io/docker/build/ansrivas/angular2-frontend.svg)]()|  

Simple angular2 app with python-flask backend (for learning angular2)

## Dockerized version:
---

The current build is using `nginx` to serve static files.

1. In project root directory execute `docker-compose up`

2. Navigate to `http://localhost:3000` and login using `admin:admin`


## Info
---

1.  `backend` directory contains the flask backend with simple authentication methods

2.  `front` directory contains the angular2 frontend based on [angular-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)

## Usage
---

1.  Clone the repo

    ```bash
    git clone --depth 1 https://github.com/ansrivas/angular2-flask.git
    cd angular2-flask
    ```

2.  Install the backend related requirements and run. The following will start a flask-server on `localhost:8080`

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

4.  Now navigate to `http://localhost:3000` and login using default credential : `admin:admin`

5.  Extra Note: To create a production build

    ```bash
    cd front
    npm install webpack-dev-server rimraf webpack typescript -g
    npm install
    npm run build:prod

    # Serves on http://localhost:5000
    npm run server:prod
    ```
