# PRISTINE APP

A highly optimized, scalable web app to post blogs and images built on SPA+REST API architecture. 

Ask for Demo on : 
[Pristine](https://pristine.vercel.app)

### Running

A step by step series of examples that tell you how to get a development env running

Install symfony dependencies:
```
your_path/blog
composer install
```
Install react dependencies:
```
your_path/react
npm install
```

**Setup the Database**

Create the database and the
schema!
```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```
If you have problems, completely drop the
database (`doctrine:database:drop --force`) and try again.

Run frontend:
```
your_path/react
npm start
```
Run backend (test env):
```
your_path/blog
APP_ENV=test php -d variables_order=EGPCS -S 127.0.0.1:8000 -t public
```
Run backend (dev env):
```
your_path/blog
APP_ENV=dev php -S 127.0.0.1:8000 -t public
```

## Built With

* [PHP7.2](http://php.net/manual/en/migration70.new-features.php) - The language used
* [Symfony4](https://symfony.com/4) - The PHP framework used
* [ApiPlatform](https://api-platform.com) - The REST framework used
* [LexikJWT](https://github.com/lexik/LexikJWTAuthenticationBundle) - The Auth Bundle used
* [VichUploader](https://symfony.com/doc/master/bundles/EasyAdminBundle/integration/vichuploaderbundle.html) - The Uploader Bundle used
* [React](https://reactjs.org) - The JS framework used
* [Redux](https://redux.js.org) - The JS state container used



## Author

* **William del Rosario** - *Initial work* - [Github](https://github.com/william251082)
