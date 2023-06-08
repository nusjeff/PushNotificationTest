import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth' ;
import { getFirestore } from 'firebase/firestore' ;
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDggkl5wvFS2GAaoUCIc7fGN8M91n19xuo",
  authDomain: "pushnotif-1605f.firebaseapp.com",
  projectId: "pushnotif-1605f",
  storageBucket: "pushnotif-1605f.appspot.com",
  messagingSenderId: "816163671479",
  appId: "1:816163671479:web:72785e876f4fa16408ec32"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {auth,db} ;