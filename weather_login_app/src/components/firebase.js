// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMBAqmebViVYfyWaGKYkgS0AcbTg51gQM",
  authDomain: "weather-app-427411.firebaseapp.com",
  projectId: "weather-app-427411",
  storageBucket: "weather-app-427411.appspot.com",
  messagingSenderId: "629851414594",
  appId: "1:629851414594:web:fcc3df546b946bb6890ddb",
  measurementId: "G-834YLW2LLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;