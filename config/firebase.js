
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAR2RAFeZp4WSJxNq2wObPJ46a2XeugKbU",
    authDomain: "extend-c43c5.firebaseapp.com",
    projectId: "extend-c43c5",
    storageBucket: "extend-c43c5.appspot.com",
    messagingSenderId: "318719700098",
    appId: "1:318719700098:web:bed335d60346f2679a589b",
    measurementId: "G-P6MKHCQPFX"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
module.exports = firebaseConfig;