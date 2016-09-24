"""This module has configurations for flask app."""

import logging
import os
from logging import handlers

from flask import Flask
from flask_cors import CORS
from flask_security import Security, SQLAlchemyUserDatastore, utils

from database.entities import Role, User, db

app = Flask(__name__)


CONFIG = {
    "development": "flask_app.config.DevelopmentConfig",
    "testing": "flask_app.config.TestingConfig",
    "production": "flask_app.config.ProductionConfig",
    "default": "flask_app.config.ProductionConfig"
}


class BaseConfig(object):
    """Base class for default set of configs."""

    DEBUG = False
    TESTING = False
    SECURITY_PASSWORD_HASH = 'pbkdf2_sha512'
    SECURITY_TRACKABLE = True
    LOGGING_FORMAT = "[%(asctime)s] [%(funcName)-30s] +\
                                    [%(levelname)-6s] %(message)s"
    LOGGING_LOCATION = 'web.log'
    LOGGING_LEVEL = logging.DEBUG
    SECURITY_TOKEN_MAX_AGE = 60 * 30
    SECURITY_CONFIRMABLE = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CACHE_TYPE = 'simple'
    SECURITY_PASSWORD_SALT = 'super-secret-stuff-here'
    COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml',
                          'application/json', 'application/javascript']

    WTF_CSRF_ENABLED = False
    COMPRESS_LEVEL = 6
    COMPRESS_MIN_SIZE = 500

    # Change it based on your admin user
    ADMIN_USER = 'admin'
    ADMIN_PASSWORD = 'admin'


class DevelopmentConfig(BaseConfig):
    """Default set of configurations for development mode."""

    DEBUG = True
    TESTING = False
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASEDIR, 'app.db')
    SECRET_KEY = 'not-so-super-secret'


class ProductionConfig(BaseConfig):
    """Default set of configurations for prod mode."""

    DEBUG = False
    TESTING = False
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASEDIR, 'app.db')
    SECRET_KEY = 'Super-awesome-secret-stuff'


class TestingConfig(BaseConfig):
    """Default set of configurations for test mode."""

    DEBUG = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    SECRET_KEY = '792842bc-c4df-4de1-9177-d5207bd9faa6'


class LogFormatter(logging.Formatter):
    datefmt = '%Y-%m-%d %H:%M:%S'

    def format(self, record):
        error_location = "%s.%s" % (record.name, record.funcName)
        line_number = "%s" % (record.lineno)
        location_line = error_location[:32] + ":" + line_number
        s = "%.19s [%-8s] [%-36s] %s" % (self.formatTime(record, self.datefmt),
                                         record.levelname,  location_line,
                                         record.getMessage())
        return s


def setup_logger():
    """Set up the global logging settings."""
    generated_files = 'logs'
    ALL_LOG_FILENAME = '{0}/all.log'.format(generated_files)
    ERROR_LOG_FILENAME = '{0}/error.log'.format(generated_files)
    if not os.path.exists(generated_files):
        os.makedirs(generated_files)

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    # create console handler and set level to info
    handler = logging.StreamHandler()
    handler.setLevel(logging.INFO)
    handler.setFormatter(LogFormatter())
    logger.addHandler(handler)

    # create error file handler and set level to error
    handler = logging.handlers.RotatingFileHandler(ERROR_LOG_FILENAME,
                                                   maxBytes=1000000,
                                                   backupCount=100)
    handler.setLevel(logging.ERROR)
    handler.setFormatter(LogFormatter())
    logger.addHandler(handler)

    # create debug file handler and set level to debug
    handler = logging.handlers.RotatingFileHandler(ALL_LOG_FILENAME,
                                                   maxBytes=1000000,
                                                   backupCount=100)
    handler.setLevel(logging.DEBUG)
    handler.setFormatter(LogFormatter())
    logger.addHandler(handler)

    print('Logging into directory {}\n'.format(generated_files))


def configure_app(app):
    """Configure the app w.r.t Flask-security, databases, loggers."""
    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_object(CONFIG[config_name])
    print(app.config)
    setup_logger()
    db.init_app(app)
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, user_datastore)

    # set up cross origin handling
    CORS(app, headers=['Content-Type'])

    db.create_all()
    if not User.query.first():
        user_datastore.create_user(
            email=app.config['ADMIN_USER'],
            password=utils.encrypt_password(app.config['ADMIN_PASSWORD']))
        db.session.commit()
