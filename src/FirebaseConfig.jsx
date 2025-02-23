import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDBC0cFcsug3rREozNgwI6QmDOGmn2570",
  authDomain: "hotel-management-system-92c54.firebaseapp.com",
  projectId: "hotel-management-system-92c54",
  storageBucket: "hotel-management-system-92c54.firebasestorage.app",
  messagingSenderId: "981119125130",
  appId: "1:981119125130:web:3a9202a12305de40af4f73"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {auth,db};