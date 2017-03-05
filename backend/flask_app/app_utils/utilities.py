"""Module which imports all the basic utility functions."""
from __future__ import absolute_import

import logging
import os
from logging import handlers

from . import html_codes


class InvalidAPIUsage(Exception):
    """Class to represent invalid API usage or when Route is not available."""

    status_code = html_codes.HTTP_BAD_REQUEST

    def __init__(self, message, status_code=None, payload=None):
        """Initialize the class with proper message and status_code."""
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """Convert message to a dict to be returned in case of invalid api."""
        ret_val = dict(self.payload or ())
        ret_val['message'] = self.message
        return ret_val


class LogFormatter(logging.Formatter):
    """."""

    datefmt = '%Y-%m-%d %H:%M:%S'

    def format(self, record):
        """."""
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
