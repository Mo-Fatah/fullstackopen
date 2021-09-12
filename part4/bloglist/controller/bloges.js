require('express-async-errors');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
blogRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({}).populate('user', {username: 1, name: 1});
  if (result) {
    response.json(result);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  if (request.body.url === undefined || request.body.title === undefined) {
    return response.status(400).send('Bad Request').end();
  }

  const token = request.token;
  const decodedToken = request.decodedToken;
  if (!token || !decodedToken) {
    return response.status(401).json({
      error: 'missing token or invalid',
    });
  }
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  const decodedToken = request.decodedToken;
  if (!token || !decodedToken) {
    return response.status(401).json({
      error: 'missing or invalid token',
    });
  }
  
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (user.id !== blog.user.toString()) {
    return response.status(403).json({
      error: 'only the creator of the blog can delete it',
    });
  }

  await blog.remove();
  response.status(201).end();
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.status(201).json(blog);
  } else {
    response.status(404).json({
      error: 'not found',
    });
  }
});

module.exports = blogRouter;
