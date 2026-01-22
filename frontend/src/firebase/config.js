// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBkoKbgdRfyJJQ0z16H9erP1CfhhVDUZbI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tools-final.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tools-final",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tools-final.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "893479548484",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:893479548484:web:9498f3aaa9463eae90ae11"
};

export default firebaseConfig;
