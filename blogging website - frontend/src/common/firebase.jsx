
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDIvdUekPmiAv8jPhpmBsxI8e6-rtmb0cY",
  authDomain: "react-js-blog-website-1618a.firebaseapp.com",
  projectId: "react-js-blog-website-1618a",
  storageBucket: "react-js-blog-website-1618a.firebasestorage.app",
  messagingSenderId: "972140559811",
  appId: "1:972140559811:web:e37da6aae8847ada029176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Auth


const provider = new GoogleAuthProvider()

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}