#!/bin/sh

cd /app  
php artisan migrate
php -S lumen:8000 -t public