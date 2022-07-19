# Blogs API Project

## About the Project

This project consists of a REST API, being part of the Trybe Web Development Course. The API is a blog management system. It enables users to create, visualize, delete, and update blog posts, as well as a categogy list to classify the posts. All routes require authentication based on JWT.

## Documentation

The complete API documentation was developed using Postman. You can access the documentation with comments and examples for all routes using this [link](https://documenter.getpostman.com/view/21397186/UzQyqP5N).

## Used Technologies & Arquitecture

The project is based on the **MSC** architecture. However, the ORM (Object-relational mapping) [Sequelize](https://sequelize.org/) was used to manage the operation with the database. Thus, the main files are divided into **services** to perform validations, and **controllers** to receive and respond to user requests.

**MySQL** was used for the database in this project. However, as Sequelize was used, the database was create and configured using models, migrations, and seeders. These files are insede the database folder.

The Blogs API Project was developed using the following technologies and libraries:
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Morgan](https://github.com/expressjs/morgan)
- [ESLint](https://eslint.org/)
- [Join](https://joi.dev/api/?v=17.6.0)

## Installing the Project Locally

Here is a guide to installing the project locally. Each step is followed by a command to perform the described action. In case of having any doubts, problems, or feedback, please, contact me.

Step 1. Create a local directory using `mkdir`:

~~~bash
mkdir project 
~~~

Step 2. Change to the created directory:

~~~bash
cd project
~~~

Step 3. Clone the project:

~~~bash
git clone git@github.com:heitortessaro/blogs-api.git 
~~~

Step 4. Change to the cloned directory:

~~~bash
cd store-manager
~~~

Passo 5. Install all dependencies of the project:

~~~bash
npm install
~~~

Step 6. Run the application

~~~bash
npm run start
~~~

The application should start running in your terminal.
