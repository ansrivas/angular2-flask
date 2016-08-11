"""Implicit module which returns token-expiry time from Flask-security."""

from flask_security import views
from werkzeug.datastructures import MultiDict
from flask import jsonify,  after_this_request
from flask_security.utils import login_user


def _render_json(app,
                 form,
                 include_user=True,
                 include_auth_token=False,
                 include_token_expiry=False):
    has_errors = len(form.errors) > 0

    if has_errors:
        code = 400
        response = dict(errors=form.errors)
    else:
        code = 200
        response = dict()
        if include_user:
            response['user'] = dict(id=str(form.user.id))
        if include_auth_token:
            token = form.user.get_auth_token()
            response['user']['authentication_token'] = token

        token_age = 'SECURITY_TOKEN_MAX_AGE'
        if include_token_expiry and (token_age in app.config):
            response['user']['token_age'] = app.config[token_age]

    return jsonify(dict(meta=dict(code=code), response=response))


def _commit(response=None):
    views._datastore.commit()
    return response


def login_with_token(request, app):
    """Return token on a login-request for a given app."""
    form_class = views._security.login_form

    if request.json:
        form = form_class(MultiDict(request.json))
    else:
        form = form_class()

    if form.validate_on_submit():
        login_user(form.user, remember=form.remember.data)
        after_this_request(_commit)

    if request.json:
        return _render_json(app,
                            form,
                            include_auth_token=True,
                            include_token_expiry=True)
