// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { LogBox } from 'react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz-we65R8iJbOCWItfoYelL00TKCXw7ZQ",
  authDomain: "vegeta1-be9a3.firebaseapp.com",
  projectId: "vegeta1-be9a3",
  storageBucket: "vegeta1-be9a3.appspot.com",
  messagingSenderId: "1083179604139",
  appId: "1:1083179604139:web:2554c9025c24ebf9247fee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)

LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release',
  'Require cycle: components/Plants/PlantCard.js -> components/Plants/PlantDescription.js -> components/Plants/PlantCard.js',
  'Require cycle: TabNavigator.js -> components/Home.js -> TabNavigator.js',
  'Require cycle: TabNavigator.js -> components/Auth/EditProfile.js -> TabNavigator.js',
  'Require cycle: TabNavigator.js -> components/MyFavorites/MyFavoritesHome.js -> TabNavigator.js',
  'Require cycle: TabNavigator.js -> components/MyListing/MyListingHome.js -> TabNavigator.js',
  'Found screens with the same name nested inside one another. Check: TabNavigator > Trades, TabNavigator > Trades > Trades This can cause confusing behavior during navigation. Consider using unique names for each screen instead.'
]);

export const createUser = (email, password, displayName) => {
  return createUserWithEmailAndPassword(auth, email, password)
}


export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  return await signOut(auth)
}



