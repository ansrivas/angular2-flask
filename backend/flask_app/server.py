"""Entry point for the server application."""

import json
import logging
from gevent.wsgi import WSGIServer
from flask import request, Response
from flask_security import auth_token_required, utils
from .config import configure_app,   app
from .app_utils import token_login, html_codes


@app.before_first_request
def set_up():
    """Configure the application to be used by the application."""
    configure_app(app)


@app.route("/api/logoutuser", methods=['POST'])
@auth_token_required
def logout():
    """Logout the currently logged in user."""
    logging.info('Logged out user !!')
    utils.logout_user()
    return 'logged out successfully', 200


@app.route('/api/loginuser', methods=['POST'])
def login():
    """View function for login view."""
    logging.info('Logged in user')
    return token_login.login_with_token(request, app)


@app.route('/api/getdata', methods=['POST'])
@auth_token_required
def get_data():
    """Get dummy data returned from the server."""
    data = {'Heroes': ['Hero1', 'Hero2', 'Hero3']}
    json_response = json.dumps(data)
    print ("returning data")
    return Response(json_response,
                    status=html_codes.HTTP_OK_BASIC,
                    mimetype='application/json')


def main():
    """Main entry point of the app."""
    try:
        http_server = WSGIServer(('0.0.0.0', 8081),
                                 app,
                                 log=logging,
                                 error_log=logging)

        http_server.serve_forever()
    except Exception as exc:
        logging.error(exc.message)
    finally:
        # get last entry and insert build appended if not completed
        # Do something here
        pass
