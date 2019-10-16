# Virtual file system

### Tech stack
* ReactJS
* Laravel
* Docker
* AWS S3

### Installation

- clone project
- create env file
- create server/env file
- create client/src/config file
- copy data from (config/config.js.example/ env/example), fill all constants properly (apikeys, passwords etc)
- run `docker-compose build`
- run `docker-compose up -d`
- run `docker exec -it  server bash`
- run `cd server/`
- run `composer install`
- run `php artisan key:generate`
- run `php artisan migrate --seed`
- run `php artisan passport:install`
- exit from container;

The app will be available on http://localhost:3000
