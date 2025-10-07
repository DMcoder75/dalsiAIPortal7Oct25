import { initializeApp } from 'firebase/app'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyCMy7EZd7cBCt_WY_JAieFiy8GqkWVkat0",
  authDomain: "innate-temple-337717.firebaseapp.com",
  projectId: "innate-temple-337717",
  storageBucket: "innate-temple-337717.firebasestorage.app",
  messagingSenderId: "767204071069",
  appId: "1:767204071069:web:b8c3462cd73d1c75512674"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Functions
const functions = getFunctions(app)

export { app, functions }
