#!/bin/bash
. env/bin/activate

cd src/client
npm run start:webpack &

cd ..
python manage.py runserver 0.0.0.0:6789
