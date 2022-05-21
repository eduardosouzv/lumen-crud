CRUD users using lumen

requeriments
 - PHP >= 8.0
 - Composer

installation - lumen
 before all, configure your .env like .env.example
 and certify that have a instance of postgresql running in your computer with correct credentials

 in backend folder run `composer install` 
 
 to run migrations `php artisan migrate`
 
 and start the server `php -S localhost:8000 -t public`


installation - frontend

 install dependencies with `npm install` or `yarn install`
 start server with `yarn start`