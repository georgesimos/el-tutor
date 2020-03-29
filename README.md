<h1 align="center">
el tutor
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

el tutor is an online web app that allows teachers and students to keep track of student's grades. Built with MERN Stack

- Admin Dashboard
- Dark Theme UI

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

# Features!

- Add / Update / Delete User
- Add / Update / Delete Lesson
- Add / Update / Delete Grades

### Tech

- [MongoDB](https://www.mongodb.com/) - A document-oriented, No-SQL database used to store the application data.
- [ExpressJS](https://expressjs.com/) - fast node.js network app framework.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.
- [nodeJS](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine

### Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies

```sh
$ git clone https://github.com/georgesimos/el-tutor.git
$ npm install
$ npm run install-client // Installing react app dependencies
```

Start the server.

```sh
$ npm install
$ npm start or npm run dev // Starting the server
```

Start the client.

```sh
$ cd client
$ npm install
$ npm start
```
### or

Start server and client without to change folders. 

```sh
$ npm start or npm run dev // Starting the server
$ npm run start-client
```

### Database seeding
Database seeding is the initial seeding of a database with data.

```sh
$ node seed.js
```
> seed.js will auto generate some dummy users, lessons and grades. For Users creation faker npm package have been used!

### Postman

Postman is a collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster.

#### Postman Documentation (must read)

el tutor API documentation : https://documenter.getpostman.com/view/2939944/SWLfaSM4

### Plugins

### Server

| Plugin       | README                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------- |
| bcryptjs     | [plugins/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)           |
| express      | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md)            |
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose     | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md)         |
| nodemon      | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md)                 |

### Client

| Plugin           | README                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| material-ui      | [plugins/material-ui/README.md](https://github.com/mui-org/material-ui/blob/master/README.md)         |
| moment           | [plugins/moment/README.md](https://www.npmjs.com/package/@date-io/moment?activeTab=readme)            |
| react            | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md)                    |
| react-redux      | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux)                               |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| react-slick      | [plugins/react-slick/README.md](https://github.com/akiran/react-slick)                                |
| redux            | [plugins/redux/README.md](https://github.com/reduxjs/redux)                                           |

# Screenshots!

Login Page
<img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/login.png" />
<details>
  <summary>More Screenshots</summary>
  
  Register Page
  <img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/register.png" />

  Account Page
  <img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/account.png" />

  Lessons Page
  <img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/lessons.png" />

  Add Lesson
  <img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/add-lesson.png" />

  Grades Page
  <img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/grades.png" />

  Users Page
  <img src="https://github.com/georgesimos/readme-assets/blob/master/el-tutor/users.png" />

 </details>


## License

MIT
