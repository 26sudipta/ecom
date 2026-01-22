// Backend routes for Firebase authentication
// Add this to your routes/auth.js or create new firebase routes file

const express = require('express');
const router = express.Router();
const { firebaseSignup, firebaseSignin, requireFirebaseAuth } = require('../controllers/firebaseAuth');

// Firebase authentication routes
router.post('/firebase-signup', firebaseSignup);
router.post('/firebase-signin', firebaseSignin);

// Example protected route using Firebase auth
router.get('/firebase-profile', requireFirebaseAuth, (req, res) => {
  res.json({
    user: req.profile
  });
});

module.exports = router;
