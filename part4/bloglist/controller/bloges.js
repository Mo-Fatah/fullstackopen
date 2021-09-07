const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({});
  if (result) {
    response.json(result);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  if (request.body.likes === undefined) {
    request.body.likes = 0;
  }
  if (request.body.url === undefined || request.body.title === undefined) {
    return response.status(400).send('Bad Request').end();
  }

  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
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
