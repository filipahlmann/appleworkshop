import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD5aeB4YS5y0cPCHEL6OE9jbFrVUeUxn1k",
    authDomain: "appleworkshop-b51c4.firebaseapp.com",
    databaseURL: "https://appleworkshop-b51c4.firebaseio.com",
    projectId: "appleworkshop-b51c4",
    storageBucket: "appleworkshop-b51c4.appspot.com",
    messagingSenderId: "107985285254",
    appId: "1:107985285254:web:261a0b02e6561917696107"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const dbiPhoneAdd = db.collection('iPhoneItems');
  export const dbiPadAdd = db.collection('iPadItems');
  export const dbMacAdd = db.collection('MacItems');
  export const dbOrders = db.collection('orderItems');