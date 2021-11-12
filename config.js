import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBYT5zwC4QLi32eozFvlwaOtoG_QL-0FVk",
    authDomain: "app-26362-2021.firebaseapp.com",
    projectId: "app-26362-2021",
    storageBucket: "app-26362-2021.appspot.com",
    messagingSenderId: "1050859788170",
    appId: "1:1050859788170:web:2ad6651997f6db50321a73",
    databaseURL: "https://app-26362-2021.firebaseio.com",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase.firestore();