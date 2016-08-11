"""This module has configurations for flask app."""

import os
import logging
from logging import handlers
from flask import Flask
from flask_cors import CORS
from database.entities import db, User, Role
from flask_security import Security, SQLAlchemyUserDatastore, utils
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
    SECRET_KEY = u'not-so-super-secret'


class ProductionConfig(BaseConfig):
    """Default set of configurations for prod mode."""

    DEBUG = False
    TESTING = False
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASEDIR, 'app.db')
    SECRET_KEY = u'Super-awesome-secret-stuff'


class TestingConfig(BaseConfig):
    """Default set of configurations for test mode."""

    DEBUG = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    SECRET_KEY = '792842bc-c4df-4de1-9177-d5207bd9faa6'


def setup_logger():
    """Setup the logger with predefined formatting of time and rollup."""
    generated_files = 'log_output'
    logfile_name = '{0}/web.log'.format(generated_files)
    if not os.path.exists(generated_files):
        os.makedirs(generated_files)

    logging.getLogger('').setLevel(logging.DEBUG)
    handler = logging.handlers.RotatingFileHandler(logfile_name,
                                                   maxBytes=10000000,
                                                   backupCount=1000)
    LOGGING_FORMAT = "[%(asctime)s] [%(name)s.%(funcName)-30s]" +\
        "[%(levelname)-6s] %(message)s"
    datefmt = '%Y-%m-%d %H:%M:%S'
    handler.setFormatter(logging.Formatter(LOGGING_FORMAT, datefmt=datefmt))
    logging.getLogger('').addHandler(handler)

    print 'Logging into {}'.format(logfile_name)


def configure_app(app):
    """Configure the app w.r.t Flask-security, databases, loggers."""
    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_object(CONFIG[config_name])

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
