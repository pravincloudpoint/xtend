import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAR2RAFeZp4WSJxNq2wObPJ46a2XeugKbU",
  authDomain: "extend-c43c5.firebaseapp.com",
  projectId: "extend-c43c5",
  storageBucket: "extend-c43c5.appspot.com",
  messagingSenderId: "318719700098",
  appId: "1:318719700098:web:bed335d60346f2679a589b",
  measurementId: "G-P6MKHCQPFX",
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

//const analytics = getAnalytics(app);
// module.exports = firebaseConfig;
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default database;
