# Firebase Setup Guide for MERN E-commerce

## Prerequisites
1. Create a Firebase account at [https://firebase.google.com/](https://firebase.google.com/)
2. Create a new Firebase project

## Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "mern-ecommerce")
4. Follow the setup wizard

### 2. Get Firebase Configuration
1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the Web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the configuration object

### 3. Configure Environment Variables
1. Create a `.env` file in the `frontend` directory
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. Enable Firebase Services

#### Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable sign-in methods you want to use:
   - Email/Password
   - Google
   - Facebook (requires app configuration)

#### Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose production mode or test mode
4. Select a location

#### Storage
1. Go to "Storage"
2. Click "Get started"
3. Set up security rules (start with test mode)

#### Analytics (Optional)
1. Go to "Analytics"
2. Enable Google Analytics if desired

### 5. Security Rules

#### Firestore Rules (Basic)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow all users to read products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

#### Storage Rules (Basic)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product images - anyone can read, only authenticated users can write
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User profile images - only the user can read/write their own images
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Usage Examples

#### Authentication
```javascript
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from './firebase/authService';

// Sign up
const result = await signUpWithEmail('user@example.com', 'password123', 'John Doe');

// Sign in
const result = await signInWithEmail('user@example.com', 'password123');

// Google Sign in
const result = await signInWithGoogle();
```

#### Storage
```javascript
import { uploadProductImage, deleteFile } from './firebase/storageService';

// Upload product image
const result = await uploadProductImage(file, productId, (progress) => {
  console.log(`Upload is ${progress}% done`);
});

// Delete file
await deleteFile('products/123/image.jpg');
```

#### Firestore
```javascript
import { createDocument, getDocuments, updateDocument } from './firebase/firestoreService';

// Create document
await createDocument('products', { name: 'Product Name', price: 29.99 });

// Get documents
const result = await getDocuments('products');

// Update document
await updateDocument('products', 'product-id', { price: 24.99 });
```

#### React Context
```javascript
import { FirebaseProvider, useFirebase } from './context/FirebaseContext';

// In your App.jsx
function App() {
  return (
    <FirebaseProvider>
      <YourApp />
    </FirebaseProvider>
  );
}

// In any component
function MyComponent() {
  const { currentUser, isAuthenticated } = useFirebase();
  
  return (
    <div>
      {isAuthenticated ? `Hello ${currentUser.displayName}` : 'Please sign in'}
    </div>
  );
}
```

## Features Included

### 1. Authentication Service
- Email/Password authentication
- Google Sign-In
- Facebook Sign-In
- Password reset
- Email verification
- Auth state observer

### 2. Storage Service
- File upload with progress tracking
- Product image upload
- User profile image upload
- File deletion
- Get file URLs
- List files in directory

### 3. Firestore Service
- CRUD operations
- Real-time listeners
- Query helpers
- Timestamps automatically added

### 4. React Context
- Firebase auth state management
- Easy access to current user
- Loading states

## Security Best Practices

1. **Never commit `.env` file to Git**
   - Add `.env` to `.gitignore`
   - Use `.env.example` as a template

2. **Use Environment Variables**
   - All sensitive data in environment variables
   - Different configs for dev/prod

3. **Implement Proper Security Rules**
   - Start restrictive, then open up as needed
   - Always validate user authentication
   - Validate data structure and content

4. **Enable App Check** (Recommended for production)
   - Protects backend resources from abuse
   - Go to Firebase Console > App Check

5. **Monitor Usage**
   - Set up budget alerts in Firebase Console
   - Monitor authentication attempts
   - Track storage usage

## Testing

Test your Firebase integration:
```bash
cd frontend
npm run dev
```

Check browser console for any Firebase initialization errors.

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check if `.env` file exists and has correct values
   - Restart dev server after changing `.env`

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console
   - Authentication > Settings > Authorized domains

3. **Storage upload fails**
   - Check storage rules
   - Verify storage bucket is enabled

4. **Firestore operations fail**
   - Check Firestore rules
   - Verify Firestore is initialized

## Next Steps

1. Update your existing authentication to use Firebase Auth
2. Migrate product images to Firebase Storage
3. Consider using Firestore for real-time features
4. Implement analytics tracking
5. Set up cloud functions for backend operations

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Pricing](https://firebase.google.com/pricing)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
