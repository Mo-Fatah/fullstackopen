require('express-async-errors');
const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs');
  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password === undefined || body.username === undefined) {
    return response.status(400).json({
          error: "username and password must be provied",
        });
  }
  if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({
      error: "username and password must be atleast 3 characters long",
    })
  }
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: [],
  });
  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = userRouter;
