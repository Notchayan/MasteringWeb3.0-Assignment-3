import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDj_pFMjpqPTcBV7Xk4tQYywWCNSXYC5ig",
    authDomain: "reactauth-6bf53.firebaseapp.com",
    projectId: "reactauth-6bf53",
    storageBucket: "reactauth-6bf53.appspot.com",
    messagingSenderId: "484800332201",
    appId: "1:484800332201:web:da0e424a0376f0f4f2c4b8",
    measurementId: "G-26VDMHBYEC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
