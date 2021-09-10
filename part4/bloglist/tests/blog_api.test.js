const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'initial title1',
    author: 'mohamed',
    url: '/.../.../',
    likes: 24,
  },
  {
    title: 'fullstack developer',
    author: 'alien',
    url: 'mars.universe',
    likes: 1,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('all bloges existed', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('all blogs have a defined id', async () => {
  const result = await api.get('/api/blogs');
  result.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a blog is posted successfully', async () => {
  const newBlog = {
    title: 'testing post',
    author: 'mohamed',
    url: 'mohamed@home',
    likes: 156,
  };
  await api.post('/api/blogs').send(newBlog);
  const result = await api.get('/api/blogs');
  expect(result.body).toHaveLength(initialBlogs.length + 1);
  const titleArray = result.body.map((blog) => blog.title);
  expect(titleArray).toContain(newBlog.title);
});

test('if no likes added , likes is set to zero', async () => {
  const newBlog = {
    title: 'no likes added',
    author: 'mohamed',
    url: 'mohamed@room',
  };
  const result = await api.post('/api/blogs').send(newBlog);
  expect(result.body.likes).toBe(0);
});

test('if no url add, response is 400 bad request', async () => {
  const noUrlBlog = {
    title: 'no url',
    author: 'mohamed',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400);
});

test('if no title add, response is 400 bad request', async () => {
  const notitleBlog = {
    url: 'no title',
    author: 'mohamed',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(notitleBlog)
    .expect(400);
});

test('successful deletion by id', async () => {
  const initialresult = await api.get('/api/blogs');
  const initialLength = initialresult.body.length;
  
  await api
    .delete(`/api/blogs/${initialresult.body[0].id}`)
    .expect(204);

  const finalresult = await api.get('/api/blogs');
  const finalLength = finalresult.body.length;
  expect(finalLength).toBe(initialLength - 1);
});

test('successful update by id', async () => {
  const initialresult = await api.get('/api/blogs');
  const updatedBlog = initialresult.body[0];
  const prevLikes = updatedBlog.like;
  updatedBlog.likes += 1;
  await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)
    .expect(201);
  

})

afterAll(async () => {
  mongoose.connection.close();
});
