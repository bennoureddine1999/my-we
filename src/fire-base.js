import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import firestor from "firebase/firestore";
import firestorage from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmiEd69xrOrg3ftBiZDV84RcaOT0-8oHA",
  authDomain: "hybrid-robot-331519.firebaseapp.com",
  projectId: "hybrid-robot-331519",
  storageBucket: "hybrid-robot-331519.appspot.com",
  messagingSenderId: "832190297656",
  appId: "1:832190297656:web:3d1972c907505cbd1f98cd",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestor;
export const storageRef = firebase.firestorage;
export default { firebase };
