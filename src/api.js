const express = require('express');
const loginRouter = require('./routes/loginRoutes');
// const middlewares = require('./middlewares/index');
const errorHandler = require('./middlewares/error');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
// app.use(middlewares.error);
app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
