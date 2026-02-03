// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGNP3MSf-QWIqamw60FYy7gdrDxFMarws",
  authDomain: "thedasheplur.firebaseapp.com",
  projectId: "thedasheplur",
  storageBucket: "thedasheplur.firebasestorage.app",
  messagingSenderId: "911516185136",
  appId: "1:911516185136:web:c88eab8a83a8761b48f3f5",
  measurementId: "G-QXQ6375XBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
