const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (request , response , next) => {
  logger.info('Method: ' + request.method );
  logger.info('Path: ' + request.path);
  logger.info('Body: '+ request.body.toString());
  logger.info('------');
  next();
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({
      error: 'unknown endpoint',
    })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id',
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send( {
      error: error.message,
    } )
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.method === 'POST' || request.method === 'DELETE') {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken) {
      request.user = await User.findById(decodedToken.id); 
      request.decodedToken = decodedToken;
    }
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
