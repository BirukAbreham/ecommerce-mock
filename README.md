# E-commerce Simple Enlisting Mock Project

## Structure of Project

- The main file to start the appliction is in `server.js`
- The project follows MVC like structure you can find all the models and controllers under `./app` folder

## Database Environment

- If running in a local environment, change the `.env.example` file to `.env` and set the necessary database environment values of the MySQL Database for the following
  - `DB_HOST` - Database host
  - `DB_USER` - Datbase user
  - `DB_PASSWORD` - Database password
  - `DB` - Database in which the application uses
  - `DB_PORT` - Port in which the databse is running
  - `APP_KEY` - application key for the `JWT` token authentication

## Commands

- The command to start the application is

```
npm start
```

- Then, go to this [link](http://localhost:5000/api-docs/)
