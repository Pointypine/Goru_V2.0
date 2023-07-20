const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');

const router = express.Router();

// /api/user

// USERS
// Add new User to the database
// changed ednpoint to 'U', change on frontend as well
router.post('/newUser', userController.makeUser, (req, res) => {
  // if the user already exists send a bool back to frontend
  if (res.locals.existingUser) {
    console.log('user already exists pick a different username');
    res.status(400).json({ message: 'Username taken!' });
  }

  console.log('User created and session created successfully.');
  return res.sendStatus(200);
});

// Login
router.post(
  '/login',
  userController.authenticate,
  userController.newSession,
  (req, res) => {
    // send back username, maybe contact?, cookie?
    res.status(200).json({
      message: 'Login successful!',
      username: res.locals.username,
      id: res.locals.userId,
    });
  },
);

//Sign-Out
router.get('/signout', userController.endSession, (req, res) => {
  res.status(200).redirect('/');
});

// Look up a single user
router.get(
  '/:name',
  userController.findUser,
  postController.findPostsByUser,
  (req, res) => {
    // res.locals.userRequest && res.locals.postList
    res
      .status(200)
      .json({
        user: {
          username: res.locals.userRequest.name,
          id: res.locals.userRequest.user_id,
          contact: res.locals.userRequest.contact,
        },
        posts: res.locals.postList,
      });
  },
);

module.exports = router;
