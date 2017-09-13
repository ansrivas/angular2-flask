# !/usr/bin/env python
# -*- coding: utf-8 -*-
"""Commonly used HTML status codes."""


class Status(object):
    """Bunch of commonly used http statuses.

    More from:
    http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
    """

    HTTP_OK_BASIC = 200
    HTTP_OK_CREATED = 201
    HTTP_OK_ACCEPTED = 202
    HTTP_OK_NORESPONSE = 204
    HTTP_BAD_REQUEST = 400
    HTTP_BAD_UNAUTHORIZED = 401
    HTTP_BAD_FORBIDDEN = 403
    HTTP_BAD_NOTFOUND = 404
    HTTP_BAD_CONFLICT = 409
    HTTP_SERVICE_UNAVAILABLE = 503
    HTTP_INTERNAL_TIMEOUT = 504
