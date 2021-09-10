const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const userHelper = require('./userHelper');
const api = supertest(app);

const initialUsers = userHelper.initialUsers;

beforeEach(async () => {
  await User.deleteMany({});
  const UsersObject = initialUsers.map((user) => new User(user));
  const arrayOfPromises = UsersObject.map((user) => user.save());
  await Promise.all(arrayOfPromises);
});

describe('GET testing', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all users returned', async () => {
    const result = await api.get('/api/users');
    expect(result.body).toHaveLength(initialUsers.length);
  });

  test('a specific user is within the returned users', async () => {
    const result = await api.get('/api/users');
    const usernames = result.body.map((user) => user.username);
    expect(usernames).toContain('ali');
  });
});

describe('POST testing', () => {
  test('success with valid data', async () => {
    const newUser = {
      username: 'Ibrahim',
      name: 'Ibrahim',
      password: '123515',
    };

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const result = await api.get('/api/users');
    expect(result.body).toHaveLength(initialUsers.length + 1);
  });

  test('fails with status code 400 if username is not provided', async () => {
    const newUser = {
      name: 'Ibrahim',
      password: '123515',
    };

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const result = await api.get('/api/users');
    expect(result.body).toHaveLength(initialUsers.length);
  });

  test('fails with status code 400 if password is not provided', async () => {
    const newUser = {
      username: 'e;wk',
      name: 'Ibrahim',
    };

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const result = await api.get('/api/users');
    expect(result.body).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});