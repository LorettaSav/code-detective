# MVP – Code Detective

This a full stack app using React, Node/Express, and MySQL. It is meant to be a game in which users have to spot errors in snippets of code. Initially, Javascript only.

## Setup

### Dependencies

- Run `npm install` in project directory.
- `cd client` and run `npm install`.
- Also run `npm install @monaco-editor/react` to be able to create the
  website IDE.

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database: `create database new-database`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=NEWDATABASE
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'students' in your database.


### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
