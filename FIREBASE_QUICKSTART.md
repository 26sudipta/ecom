# Firebase Quick Start Commands

## 1. Frontend Setup

```bash
# Navigate to frontend
cd /home/sudipta/WEV_APP/tools_final/mern-ecommerce/frontend

# Create .env file
cat > .env << 'EOF'
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
VITE_API_URL=http://localhost:5000/api
EOF

# Install dependencies (already done)
# npm install firebase

# Start frontend
npm run dev
```

## 2. Backend Setup

```bash
# Navigate to backend
cd /home/sudipta/WEV_APP/tools_final/mern-ecommerce

# Install Firebase Admin SDK
npm install firebase-admin

# Add to .env
echo "FIREBASE_STORAGE_BUCKET=your-project.appspot.com" >> .env

# Download service account key from Firebase Console
# Save as: firebase-service-account.json

# Add to .gitignore
echo "firebase-service-account.json" >> .gitignore

# Start backend
npm start
```

## 3. Test Firebase

```bash
# Open browser
# Visit: http://localhost:5173

# Try:
# 1. Sign up with email
# 2. Sign in with Google
# 3. Upload an image
```

## 4. What You Have Now

### Custom Hooks (frontend/src/hooks/useFirebase.js)
- `useFirebaseAuth()` - Authentication operations
- `useFirebaseStorage()` - File upload/delete
- `useFirestore()` - Database CRUD
- `useFirestoreRealtime()` - Real-time data

### Components
- `SigninWithFirebase.jsx` - Enhanced signin with Google/Facebook
- `SignupWithFirebase.jsx` - Enhanced signup with social auth
- `FirebaseImageUpload.jsx` - Drag-drop image upload with preview

### Services
- `authService.js` - Email, Google, Facebook auth
- `storageService.js` - File upload/download/delete
- `firestoreService.js` - Database operations

### Backend
- `firebaseAuth.js` - Controller for token verification
- `firebaseAuth.js` - Routes for Firebase endpoints

## 5. Usage Examples

### Sign in with Google
```javascript
import { useFirebaseAuth } from '../hooks/useFirebase';

const { signInGoogle } = useFirebaseAuth();
const result = await signInGoogle();
```

### Upload Image
```javascript
import FirebaseImageUpload from '../components/FirebaseImageUpload';

<FirebaseImageUpload 
  productId="123"
  onUploadSuccess={(data) => console.log(data.url)}
/>
```

### Get Real-time Data
```javascript
import { useFirestoreRealtime } from '../hooks/useFirebase';

const { data: products, loading } = useFirestoreRealtime('products');
```

## 6. Next Steps

1. **Get Firebase Credentials**:
   - Go to: https://console.firebase.google.com
   - Create project → Get config → Add to .env

2. **Enable Services**:
   - Authentication: Email, Google, Facebook
   - Firestore Database
   - Storage

3. **Test Integration**:
   - Run frontend: `cd frontend && npm run dev`
   - Run backend: `npm start`
   - Test signup/signin

4. **Update Security Rules**:
   - See FIREBASE_IMPLEMENTATION_GUIDE.md

## 7. Files Created

✅ Frontend:
- src/firebase/config.js
- src/firebase/firebase.js
- src/firebase/authService.js
- src/firebase/storageService.js
- src/firebase/firestoreService.js
- src/firebase/index.js
- src/context/FirebaseContext.jsx
- src/hooks/useFirebase.js
- src/components/FirebaseImageUpload.jsx
- src/user/SigninWithFirebase.jsx
- src/user/SignupWithFirebase.jsx
- src/examples/ProductWithFirebase.jsx

✅ Backend:
- controllers/firebaseAuth.js
- routes/firebaseAuth.js

✅ Documentation:
- FIREBASE_SETUP.md
- FIREBASE_IMPLEMENTATION_GUIDE.md
- FIREBASE_QUICKSTART.md (this file)

## 8. Important Notes

⚠️ **Before Going to Production**:
1. Update Firebase security rules
2. Enable App Check
3. Set up billing alerts
4. Add production domain to authorized domains
5. Use environment-specific configs

🔐 **Security**:
- Never commit .env files
- Never commit firebase-service-account.json
- Always use environment variables
- Update Firestore/Storage rules

📱 **Features Available**:
- Email/Password authentication
- Google Sign-In
- Facebook Sign-In
- Password reset
- Email verification
- Image upload with progress
- Real-time database
- File storage

## 9. Common Commands

```bash
# Check if Firebase is installed
cd frontend && npm list firebase

# Run both frontend and backend
cd frontend && npm run dev
# In another terminal:
cd .. && npm start

# Check environment variables
cd frontend && cat .env

# View Firebase service account
cat firebase-service-account.json | jq

# Clear node modules and reinstall
rm -rf node_modules && npm install
```

## 10. Resources

- Firebase Console: https://console.firebase.google.com
- Firebase Docs: https://firebase.google.com/docs
- React Firebase Hooks: https://github.com/CSFrequency/react-firebase-hooks
- Your Implementation Guide: FIREBASE_IMPLEMENTATION_GUIDE.md

---

**Ready to use Firebase! 🚀**

Start with: `npm run dev` in frontend and `npm start` in backend
