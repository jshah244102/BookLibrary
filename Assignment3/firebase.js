// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuIN5_sa-zJ4D_fNlex-M44gOjuczd4uU",
  authDomain: "booklibrary-38e6b.firebaseapp.com",
  projectId: "booklibrary-38e6b",
  storageBucket: "booklibrary-38e6b.firebasestorage.app",
  messagingSenderId: "102852479532",
  appId: "1:102852479532:web:b3765d00b6808328f1df89"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
