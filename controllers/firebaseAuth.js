// Backend controller for Firebase authentication integration
// Add this to your controllers/auth.js or create a new firebase controller

const admin = require('firebase-admin');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Initialize Firebase Admin SDK (add this to your server.js or a separate config file)
// const serviceAccount = require('./path-to-your-firebase-service-account.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

/**
 * Firebase Sign Up - Verify Firebase token and create user in MongoDB
 */
exports.firebaseSignup = async (req, res) => {
  try {
    const { idToken, email, displayName, photoURL, uid } = req.body;

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (decodedToken.uid !== uid) {
      return res.status(401).json({
        error: 'Unauthorized: Token mismatch'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        error: 'User with this email already exists'
      });
    }

    // Create new user in MongoDB
    user = new User({
      name: displayName || email.split('@')[0],
      email,
      firebaseUid: uid,
      photoURL,
      // No password needed for Firebase users
      password: 'firebase-auth', // Placeholder
      authProvider: 'firebase'
    });

    await user.save();

    // Generate JWT token for your backend
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    console.error('Firebase signup error:', error);
    res.status(500).json({
      error: 'Error creating user with Firebase authentication'
    });
  }
};

/**
 * Firebase Sign In - Verify Firebase token and sign in user
 */
exports.firebaseSignin = async (req, res) => {
  try {
    const { idToken, email, displayName, photoURL, uid } = req.body;

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (decodedToken.uid !== uid) {
      return res.status(401).json({
        error: 'Unauthorized: Token mismatch'
      });
    }

    // Find user in MongoDB
    let user = await User.findOne({ $or: [{ email }, { firebaseUid: uid }] });

    // If user doesn't exist, create one
    if (!user) {
      user = new User({
        name: displayName || email.split('@')[0],
        email,
        firebaseUid: uid,
        photoURL,
        password: 'firebase-auth',
        authProvider: 'firebase'
      });
      await user.save();
    } else {
      // Update Firebase UID if not set
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    console.error('Firebase signin error:', error);
    res.status(500).json({
      error: 'Error signing in with Firebase authentication'
    });
  }
};

/**
 * Middleware to verify Firebase token
 */
exports.requireFirebaseAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      });
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Find user in database
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    req.profile = user;
    next();
  } catch (error) {
    console.error('Firebase auth middleware error:', error);
    res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};

// Export functions
module.exports = {
  firebaseSignup,
  firebaseSignin,
  requireFirebaseAuth
};
