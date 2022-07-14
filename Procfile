release: python manage.py migrate

web: gunicorn campus_olx.wsgi:application --log-file - --log-level debug