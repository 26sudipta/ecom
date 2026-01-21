const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 1 },
      { new: true }
    );

    if (user) {
      console.log(`✅ User ${user.name} (${user.email}) is now an admin!`);
    } else {
      console.log('❌ User not found with that email');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node makeAdmin.js <user-email>');
  process.exit(1);
}

makeAdmin(email);
