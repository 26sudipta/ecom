const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const Category = require('./models/category');
const Product = require('./models/product');

const seedFromFakeStore = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Fetch categories from FakeStore API
    console.log('Fetching categories from FakeStore API...');
    const categoriesResponse = await axios.get('https://fakestoreapi.com/products/categories');
    const categoryNames = categoriesResponse.data;

    // Create categories in our database
    const categories = [];
    for (const categoryName of categoryNames) {
      const category = await Category.create({
        name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      });
      categories.push(category);
    }
    console.log(`✅ ${categories.length} categories created`);

    // Fetch products from FakeStore API
    console.log('Fetching products from FakeStore API...');
    const productsResponse = await axios.get('https://fakestoreapi.com/products');
    const fakeStoreProducts = productsResponse.data;

    // Map and create products
    const products = [];
    for (const product of fakeStoreProducts) {
      // Find matching category
      const category = categories.find(
        cat => cat.name.toLowerCase() === product.category.toLowerCase() ||
               cat.name.toLowerCase().includes(product.category.toLowerCase())
      );

      if (category) {
        const newProduct = {
          name: product.title.length > 32 ? product.title.substring(0, 29) + '...' : product.title,
          description: product.description.length > 2000 ? product.description.substring(0, 1997) + '...' : product.description,
          price: product.price,
          category: category._id,
          quantity: Math.floor(Math.random() * 100) + 20, // Random quantity between 20-120
          imageUrl: product.image,
          shipping: true,
          sold: 0,
        };
        products.push(newProduct);
      }
    }

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products created`);

    console.log('\n🎉 Database seeded successfully with FakeStore API data!');
    console.log(`📦 ${categories.length} categories created`);
    console.log(`📦 ${products.length} products created`);
    console.log('\nCategories:', categories.map(c => c.name).join(', '));
    console.log('\nYou can now view products in your app!');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedFromFakeStore();
