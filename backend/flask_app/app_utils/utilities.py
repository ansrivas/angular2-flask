"""Module which imports all the basic utility functions."""
from __future__ import absolute_import
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
