import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrb8wioNx6cjjPsuG0klO8LorQQhNdrDo",
  authDomain: "projct-c56a6.firebaseapp.com",
  projectId: "projct-c56a6",
  storageBucket: "projct-c56a6.appspot.com",
  messagingSenderId: "1057662789405",
  appId: "1:1057662789405:web:a9b9ff9013a1d6126d23f4",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
