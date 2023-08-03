// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtG8D5u6zwRKtTypuy8mx21JuRSamK8yQ",
  authDomain: "a-kanji-a-day.firebaseapp.com",
  projectId: "a-kanji-a-day",
  storageBucket: "a-kanji-a-day.appspot.com",
  messagingSenderId: "669859918193",
  appId: "1:669859918193:web:4c13fc8284bb4bdc9646d0",
  measurementId: "G-ND19KH5VSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;