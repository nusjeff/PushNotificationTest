import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth' ;
import { getFirestore } from 'firebase/firestore' ;
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzMCQfoVk1uxP4Evtd5X1y7vB65SPKxSg",
  authDomain: "pushnotif-da12b.firebaseapp.com",
  projectId: "pushnotif-da12b",
  storageBucket: "pushnotif-da12b.appspot.com",
  messagingSenderId: "945496463696",
  appId: "1:945496463696:web:a70aae7728fe7b39e23455"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {auth,db} ;