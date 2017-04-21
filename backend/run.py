"""Entry point for the backend application."""

from pylogging import HandlerType, setup_logger

from flask_app import server

if __name__ == '__main__':
    setup_logger(log_directory='./logs',
                 file_handler_type=HandlerType.TIME_ROTATING_FILE_HANDLER,
                 allow_console_logging=True,
                 allow_file_logging=False,
                 backup_count=100,
                 max_file_size_bytes=100000,
                 when_to_rotate='D',
                 change_log_level=None)
    server.main()
