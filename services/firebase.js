import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8AtpzotwHULKwcxUbbttO6L4yQugV1zY",
  authDomain: "task-manager-d326e.firebaseapp.com",
  projectId: "task-manager-d326e",
  storageBucket: "task-manager-d326e.firebasestorage.app",
  messagingSenderId: "352396240066",
  appId: "1:352396240066:web:6a7084fe14b87f72cf075b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // لا تستخدم initializeAuth هنا
const db = getFirestore(app);

export { auth, db };
