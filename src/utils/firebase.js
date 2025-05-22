import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfX0kIykcgQsKgRdUkwLz20IzO869ghnU",
  authDomain: "quiver-cffdf.firebaseapp.com",
  projectId: "quiver-cffdf",
  storageBucket: "quiver-cffdf.firebasestorage.app",
  messagingSenderId: "609283583950",
  appId: "1:609283583950:web:d37e6ccec11c86f0e8459f",
  measurementId: "G-FV5SHMZDX8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
