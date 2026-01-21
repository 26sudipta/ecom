const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./models/category');
const Product = require('./models/product');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Kitchen' },
      { name: 'Sports' },
    ]);
    console.log('✅ Categories created');

    // Create sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
        price: 89.99,
        category: categories[0]._id, // Electronics
        quantity: 50,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracker with heart rate monitor, GPS, and smartphone notifications. Water resistant design.',
        price: 199.99,
        category: categories[0]._id, // Electronics
        quantity: 30,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Laptop Stand',
        description: 'Ergonomic aluminum laptop stand for better posture and increased productivity.',
        price: 39.99,
        category: categories[0]._id, // Electronics
        quantity: 100,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors. Breathable and durable.',
        price: 19.99,
        category: categories[1]._id, // Clothing
        quantity: 200,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans with a modern fit. Made from premium denim fabric.',
        price: 49.99,
        category: categories[1]._id, // Clothing
        quantity: 80,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Winter Jacket',
        description: 'Warm and stylish winter jacket with insulated lining. Perfect for cold weather.',
        price: 129.99,
        category: categories[1]._id, // Clothing
        quantity: 40,
        shipping: true,
        sold: 0,
      },
      {
        name: 'JavaScript Programming Book',
        description: 'Comprehensive guide to modern JavaScript development. Includes ES6+ features and best practices.',
        price: 34.99,
        category: categories[2]._id, // Books
        quantity: 75,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Fiction Novel - The Great Story',
        description: 'Bestselling fiction novel that will keep you engaged from start to finish.',
        price: 14.99,
        category: categories[2]._id, // Books
        quantity: 120,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe. Brews perfect coffee every time.',
        price: 79.99,
        category: categories[3]._id, // Home & Kitchen
        quantity: 45,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Non-Stick Cookware Set',
        description: '10-piece non-stick cookware set. Includes pots, pans, and lids. Dishwasher safe.',
        price: 149.99,
        category: categories[3]._id, // Home & Kitchen
        quantity: 25,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Yoga Mat',
        description: 'Premium yoga mat with excellent grip and cushioning. Includes carrying strap.',
        price: 29.99,
        category: categories[4]._id, // Sports
        quantity: 90,
        shipping: true,
        sold: 0,
      },
      {
        name: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands for home workouts. Different resistance levels included.',
        price: 24.99,
        category: categories[4]._id, // Sports
        quantity: 110,
        shipping: true,
        sold: 0,
      },
    ];

    await Product.insertMany(products);
    console.log('✅ Products created');

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📦 ${categories.length} categories created`);
    console.log(`📦 ${products.length} products created`);
    console.log('\nYou can now view products in your app!');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedDatabase();
