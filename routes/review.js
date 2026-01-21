const express = require('express');
const router = express.Router();

const { create, getByProduct, list, update, remove } = require('../controllers/review');
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// Create review (authenticated users only)
router.post('/review/create/:userId', requireSignin, isAuth, create);

// Get reviews for a specific product
router.get('/reviews/product/:productId', getByProduct);

// Get all reviews (for display)
router.get('/reviews', list);

// Update review (owner only)
router.put('/review/:reviewId/:userId', requireSignin, isAuth, update);

// Delete review (owner only)
router.delete('/review/:reviewId/:userId', requireSignin, isAuth, remove);

// User param
router.param('userId', userById);

module.exports = router;
