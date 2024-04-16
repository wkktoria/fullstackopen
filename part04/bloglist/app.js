const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

mongoose.set('strictQuery', false);

logger.info('Connecting to', MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
