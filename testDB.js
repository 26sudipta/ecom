const mongoose = require('mongoose');
const Product = require('./models/product');
const Category = require('./models/category');
require('dotenv').config();

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
    
    const productCount = await Product.countDocuments();
    console.log('Total products:', productCount);
    
    const categoryCount = await Category.countDocuments();
    console.log('Total categories:', categoryCount);
    
    const products = await Product.find().limit(2);
    console.log('\nSample products:', JSON.stringify(products, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

testDB();
