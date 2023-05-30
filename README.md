# MVP – Code Detective

This a full stack app using React, Node/Express, and MySQL. It is meant to be a game in which users have to spot errors in snippets of code. Initially, Javascript only.

## Setup

### Dependencies

- Run `npm install` in project directory.
- `cd client` and run `npm install`.
- JUST IN CASE it's absent in package.json: Also run `npm install @monaco-editor/react monaco-editor` to be able to create the website IDE.

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

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'snippets' in your database (see below)

Table: snippets

| Field | Type | Null | Key | Default | Extra          |
|-------|------|------|-----|---------|----------------|
| id    | int  | NO   | PRI | NULL    | auto_increment |
| code  | text | YES  |     | NULL    |                |
| level | int  | YES  |     | NULL    |                |
| tests | text | YES  |     | NULL    |                |

## END-POINTS

- `/api/snippets` --> Home and Game (both GET and POST endpoints set up)
- `/api/snippets/level/:level_id` --> get snippets per level(level id is actually the level number).They arrive in a random order.
- `/api/snippets/:snippet_id` --> to get specific snippet
- **Virtual Machine (vm)** : Some explanation: we are using node:vm which is a virtual machine module. What it does, is to basically provide a virtual space to execute code when provided as string (as it is when we receive is from json.stringify). First there's a "context" creation, basically that space for the code to be executed. In that one, I have declared an empty array called results to push in both the code to be tested and the tests I would like to execute on that code.
`/attempt/:question_id` --> we use vm to POST the users corrected code attempt and test it. (it is based on the question_id which is basically the code id from the snippets table).

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

### FRONT END ARCHITECTURE

![front end diagram of components](https://mermaid.ink/img/pako:eNpdz70OgjAUhuFbac5UErgBBhPAvwEXSXSwDpUepZH-pLQxhnDvVkwY3E6enOF7R2iNQMjh4bjtSH1kurgU1l5Jlq1ISemOK0ySqDNsKC1uJvivlLNUtDLKyh7dQlvahLbFYThJfC26o7X5oz09Sz0LpKDQKS5FnDIyTQgD36FCBnk8BXdPBkxP8Y8Hb5q3biH3LmAKwQrucS15LFCQ33k_REUhvXGHX9ucOH0AmY9Jhw?type=png)

### COMMUNICATION BETWEEN BACKEND, API, VIRTUAL MODEL and FRONTEND

- **if you cant the labeling click on it to see the image**

![communication of fullstack diagram](https://mermaid.ink/img/pako:eNptUcFKAzEQ_ZUh5y3egywoKngoFio95ZJNpjV0dxInE2kp_Xezuy1W8ZZM3pv3Xt5JuehRaZXxsyA5fAp2x3Yw9Gjd_pk8LNoWHlavGjKFlFAyiO161HDf8V07shvo8Qv7BgSzZEMVPZJeOJLUDTfMhDxjIdDMZ0s-DhDZI8_MxQEu0hpWb-t3kDhD_xi4DJF8ioEE8BCqOnRFgKJAyejB0NXET4z6wDDa_ifiFAC2kSEndGEb3AU5GauozfJmweisw4lUtWqQ6gFdqRdDmyX8_oMRFWgHjLn0Y4aJ60NOvT2iV40akAcbfO3iZAjAKPnAAY3S9egt740ydK44WySuj-SUFi7YqJK8lWtvSm9tn-sUfZDIy7ncqePzN1V2p54?type=png)

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona by Loretta Savvidou in collaboration with TO BE COMPLETED._
