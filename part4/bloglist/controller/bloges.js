require('express-async-errors');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
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
  
  if (request.body.url === undefined || request.body.title === undefined) {
    return response.status(400).send('Bad Request').end();
  }

  const body = request.body;
  const user = await User.findById(body.user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: body.user,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});
blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.like,
  };
  Blog.findByIdAndUpdate(request.params.id, updatedBlog);
  response.status(201).json(updatedBlog);
});
module.exports = blogRouter;
