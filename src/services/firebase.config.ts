import firebase from "firebase";
import algoliasearch from "algoliasearch";

const firebaseConfig = {
  apiKey: "AIzaSyC85je2mzHM5GKAz6gkuB2_0Rts5dejfa0",
  authDomain: "shopping-1dac0.firebaseapp.com",
  projectId: "shopping-1dac0",
  storageBucket: "shopping-1dac0.appspot.com",
  messagingSenderId: "913968748702",
  appId: "1:913968748702:web:79df3a9860eae99edbc38f",
};

firebase.initializeApp(firebaseConfig);
const db: firebase.firestore.Firestore = firebase.firestore();
const auth: firebase.auth.Auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

/**
 * algolia item search and db
 */
const client = algoliasearch("YMXHGIUM6F", "0085c9f7f7ced31a0d681f8a7258b460");
const index = client.initIndex("product");

export { index };
