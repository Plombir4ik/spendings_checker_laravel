# Spendings-checker

Personal finance manager for convenient tracking of your
income and expenses with user-friendly reports and graphs.

### Installation

Make sure you have **PHP** and **Composer** installed for running **Laravel**, as well as **Node.js** and **npm** for installing and running JavaScript dependencies.

Before running the application, ensure to rename the **.env.example** file to **.env** and configure the **DB_** keys for database connection.

#### Server Setup

- Go to server directory: `cd server`
- Install php dependencies: `cd server && composer install`

- Generate a new application key: `php artisan key:generate`

- Start server part: `php artisan serve`

#### Client Setup

- Go to client directory: `cd .. && cd client`

- Install javascript dependencies: `npm install`

- Build project: `npm run build`

- Start client part: `npm run start`

