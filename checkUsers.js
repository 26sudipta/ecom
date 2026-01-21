const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected\n');

    const users = await User.find({}).select('name email role');
    console.log('=== ALL USERS IN DATABASE ===\n');
    
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('\n📝 To access admin panel, you need to:');
      console.log('1. Sign up at: http://localhost:5174/signup');
      console.log('2. Then run: node makeAdmin.js <your-email>');
    } else {
      let hasAdmin = false;
      users.forEach(user => {
        const roleText = user.role === 1 ? '👑 ADMIN' : '👤 USER';
        console.log(`${roleText} - ${user.name} - ${user.email}`);
        if (user.role === 1) hasAdmin = true;
      });
      
      if (!hasAdmin) {
        console.log('\n⚠️  No admin user found!');
        console.log('To make a user admin, run:');
        console.log('node makeAdmin.js <user-email>');
      } else {
        console.log('\n✅ Admin user found! Sign in to access admin panel.');
      }
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

checkUsers();
