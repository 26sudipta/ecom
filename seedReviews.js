const mongoose = require('mongoose');
require('dotenv').config();
const Review = require('./models/review');
const Product = require('./models/product');
const User = require('./models/user');

const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Get some products and users
    const products = await Product.find().limit(5);
    const users = await User.find().limit(3);

    if (products.length === 0) {
      console.log('No products found. Please seed products first.');
      process.exit(0);
    }

    if (users.length === 0) {
      console.log('No users found. Creating a demo user...');
      const demoUser = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      users.push(demoUser);
    }

    // Clear existing reviews
    await Review.deleteMany({});
    console.log('Cleared existing reviews');

    const sampleReviews = [
      {
        rating: 5,
        comment: 'Excellent product! Exceeded my expectations. The quality is outstanding and delivery was super fast. Highly recommend!',
      },
      {
        rating: 4,
        comment: 'Very good product. Works as described. Good value for money. Would buy again.',
      },
      {
        rating: 5,
        comment: 'Amazing! This is exactly what I was looking for. Perfect quality and great customer service.',
      },
      {
        rating: 4,
        comment: 'Great purchase! The product arrived on time and in perfect condition. Very satisfied with my order.',
      },
      {
        rating: 5,
        comment: 'Outstanding quality! This product has become an essential part of my daily routine. Absolutely love it!',
      },
      {
        rating: 4,
        comment: 'Really happy with this purchase. Good quality and reasonable price. Definitely recommend.',
      },
      {
        rating: 5,
        comment: 'Fantastic! The best purchase I have made this year. Excellent quality and fast shipping.',
      },
      {
        rating: 5,
        comment: 'I am blown away by the quality! This product is worth every penny. Will definitely shop here again.',
      },
    ];

    const reviews = [];
    for (let i = 0; i < sampleReviews.length && i < products.length * users.length; i++) {
      const productIndex = i % products.length;
      const userIndex = i % users.length;
      
      const review = await Review.create({
        product: products[productIndex]._id,
        user: users[userIndex]._id,
        userName: users[userIndex].name,
        rating: sampleReviews[i].rating,
        comment: sampleReviews[i].comment,
      });
      reviews.push(review);
    }

    console.log(`✅ ${reviews.length} reviews created successfully!`);
    console.log('\nSample reviews have been added to the database.');
    console.log('You can now see them on the home page and product detail pages.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding reviews:', err);
    process.exit(1);
  }
};

seedReviews();
