// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQjuzwMN4L6gWKVGmB0bfWD8O_rIDzhZA",
  authDomain: "vegetationstation1.firebaseapp.com",
  projectId: "vegetationstation1",
  storageBucket: "vegetationstation1.appspot.com",
  messagingSenderId: "362861017973",
  appId: "1:362861017973:web:b8bb5e7ef7bc4f916d713c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export const createUser = (email, password, displayName) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      updateProfile(auth.currentUser, {
        displayName
      })
    })
    .catch(err => alert(err.message))
}


export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => console.log(user.uid))
    .catch(err => alert(err.message))
}

export const signOutUser = async () => {
  return await signOut(auth)
}



