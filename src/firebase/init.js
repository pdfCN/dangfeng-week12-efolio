import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqVGb3kaZbld2YXkSnaC2_XDM231PEL6Y",
    authDomain: "week7-dangfeng.firebaseapp.com",
    databaseURL: "https://week7-dangfeng-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "week7-dangfeng",
    storageBucket: "week7-dangfeng.appspot.com",
    messagingSenderId: "140855762777",
    appId: "1:140855762777:web:fff497a1505e0dd8147648"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);

  const db = getFirestore();
  export default db