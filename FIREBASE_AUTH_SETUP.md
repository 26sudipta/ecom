# Firebase Authentication Setup - Quick Guide

## 📱 What You Get
- ✅ Email/Password authentication
- ✅ Google Sign-In
- ✅ Facebook Sign-In
- ✅ Password reset
- ✅ Email verification
- ✅ Integration with your existing backend

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project → `mern-ecommerce`
3. Click Web icon `</>` → Register app
4. Copy the config values

### Step 2: Configure Frontend

Create `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Enable Authentication

In Firebase Console:
1. **Authentication** → Get started
2. Enable **Email/Password**
3. Enable **Google** (select support email)
4. Enable **Facebook** (optional, needs FB app setup)

### Step 4: Update App.jsx

```javascript
import { FirebaseProvider } from './context/FirebaseContext';

const App = () => (
  <FirebaseProvider>
    <Routes />
  </FirebaseProvider>
);
```

### Step 5: Test It

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173/signin` and try:
- Email/password sign in
- Google sign in button
- Facebook sign in button

---

## 📁 Files Created

### Frontend
- `src/firebase/config.js` - Firebase config
- `src/firebase/firebase.js` - Firebase initialization
- `src/firebase/authService.js` - Auth methods
- `src/firebase/index.js` - Exports
- `src/context/FirebaseContext.jsx` - React context
- `src/hooks/useFirebaseAuth.js` - Auth hook
- `src/user/SigninFirebase.jsx` - Enhanced signin
- `src/user/SignupFirebase.jsx` - Enhanced signup

### Backend
- `controllers/firebaseAuth.js` - Token verification
- `routes/firebaseAuth.js` - Auth routes

---

## 💡 Usage Examples

### In Any Component

```javascript
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

const MyComponent = () => {
  const { signInGoogle, currentUser, signOut } = useFirebaseAuth();

  return (
    <div>
      {currentUser ? (
        <>
          <p>Welcome, {currentUser.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};
```

### Check Auth Status

```javascript
import { useFirebase } from '../context/FirebaseContext';

const { currentUser, isAuthenticated } = useFirebase();

if (isAuthenticated) {
  console.log('User:', currentUser.email);
}
```

---

## 🔧 Backend Setup (Optional but Recommended)

### Install Firebase Admin

```bash
npm install firebase-admin
```

### Get Service Account Key

1. Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Save as `firebase-service-account.json`
4. Add to `.gitignore`

### Initialize Admin SDK

Create `config/firebase-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = { admin };
```

### Add Routes

In `server.js`:

```javascript
const firebaseAuthRoutes = require('./routes/firebaseAuth');
app.use('/api/auth', firebaseAuthRoutes);
```

---

## 🎯 How It Works

### Sign In Flow

1. User clicks "Sign in with Google"
2. Firebase handles OAuth popup
3. Returns user info and ID token
4. Frontend sends token to backend
5. Backend verifies token
6. Creates/updates user in MongoDB
7. Returns JWT for your app
8. User is authenticated in both systems

### Security

- Firebase tokens are verified on backend
- Users stored in your MongoDB
- Your JWT used for API requests
- Firebase handles OAuth complexity

---

## 🔐 Facebook Setup (Optional)

### Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create App → Consumer
3. Add Facebook Login product
4. Settings → Basic:
   - Copy App ID
   - Copy App Secret

### Configure Firebase

1. Firebase Console → Authentication → Sign-in method
2. Facebook → Enable
3. Enter App ID and App Secret
4. Copy OAuth redirect URI

### Configure Facebook App

1. Facebook Login → Settings
2. Valid OAuth Redirect URIs → Paste Firebase URI
3. Save changes

---

## 🧪 Testing

### Test Email Auth
```bash
# Run frontend
cd frontend && npm run dev

# Go to signup page
# Create account with email
# Check Firebase Console → Authentication → Users
```

### Test Google Auth
```bash
# Click "Sign in with Google"
# Select Google account
# Should redirect to dashboard
```

### Test Backend Integration
```bash
# Start backend
npm start

# Backend should verify Firebase tokens
# Check terminal for logs
```

---

## 🐛 Troubleshooting

### "Firebase not initialized"
→ Check `.env` file exists with correct values
→ Restart `npm run dev`

### Google Sign-In popup blocked
→ Allow popups for localhost
→ Check browser console

### "Unauthorized domain"
→ Firebase Console → Authentication → Settings → Authorized domains
→ Add `localhost`

### Backend can't verify tokens
→ Ensure `firebase-service-account.json` exists
→ Check file path in config

---

## 📊 What You Have Now

✅ Email/password authentication
✅ Google Sign-In (one-click)
✅ Facebook Sign-In (one-click)
✅ Password reset functionality
✅ Email verification
✅ User synced with your MongoDB
✅ Works with existing auth system
✅ React hooks for easy use
✅ Material-UI components
✅ Loading states & error handling

---

## 🎓 Next Steps

1. ✅ Test all auth methods
2. Replace old Signin/Signup with new Firebase versions
3. Add forgot password page
4. Customize UI/styling
5. Add profile picture from Google/Facebook
6. Implement email verification flow
7. Add auth state persistence

---

## 📝 Quick Commands

```bash
# Install dependencies (already done)
cd frontend && npm install firebase

# Create .env file
cp .env.example .env
# Then edit with your Firebase credentials

# Start frontend
npm run dev

# Start backend (separate terminal)
cd .. && npm start

# View in browser
open http://localhost:5173
```

---

## 🔗 Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

---

**Firebase Authentication is ready! 🎉**

Try signing in at: `http://localhost:5173/signin`
