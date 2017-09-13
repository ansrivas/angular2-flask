# !/usr/bin/env python
# -*- coding: utf-8 -*-
"""Create app and create a default first user."""


import os

from flask import Flask
from flask_cors import CORS
from flask_security import Security, utils

from .config import CONFIG
from .models import User, db, user_datastore


def create_app():
    """Configure the app w.r.t Flask-security, databases, loggers."""
    app = Flask(__name__)
    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_object(CONFIG[config_name])
    db.init_app(app)
    Security(app, user_datastore)
    CORS(app, headers=['Content-Type'])

    return app


def create_user(app):
    """Create first user if doesn't exist."""
    db.create_all()
    if not User.query.first():
        user_datastore.create_user(
            email=app.config['ADMIN_USER'],
            password=utils.encrypt_password(app.config['ADMIN_PASSWORD']))
    db.session.commit()
