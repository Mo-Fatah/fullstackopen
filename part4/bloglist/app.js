const config = require('./utils/config');
const express = require('express');
const app = express();
const logger = require ('./utils/logger');
const middleware = require ('./utils/middleware');
const cors = require('cors')
const blogesRouter = require('./controller/bloges');
const mongoose = require ('mongoose');

mongoose.connect(config.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB');
  }).catch(error => logger.error("and error occurred"));

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);
app.use('/api/blogs', blogesRouter );

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);




module.exports = app;