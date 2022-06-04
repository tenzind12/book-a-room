const express = require('express');
const router = express.Router();

const User = require('../models/user');

// user registration
router.post('/register', async (req, res) => {
  const newUser = new User(req.body);

  try {
    const user = await newUser.save();
    res.send('User Registered successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // search for the user in the database
    const user = await User.findOne({ email: email, password: password });
    // if exists, send user's details except password
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else return res.status(400).json({ message: 'User not found' });
  } catch (error) {
    return res.status(400).json({ message: 'catched error here' });
  }
});

// ADMIN SIDE
router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
});
module.exports = router;
