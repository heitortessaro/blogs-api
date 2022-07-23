const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const loginRouter = require('./routes/loginRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRoute = require('./routes/categoryRoute');
const postRoute = require('./routes/postRoute');
const middlewares = require('./middlewares/index');

require('express-async-errors');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);
app.use(middlewares.error);
// app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
