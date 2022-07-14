const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const middlewares = require('./middlewares');

const app = express();
require('express-async-errors');

app.use(express.json());

app.use('/login', loginRouter);
app.use(middlewares.error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
