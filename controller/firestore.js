//**************************************************************************** */

// Import the functions you need from the SDKs you need

import { async } from "@firebase/util";

import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

import {getFirestore,collection,getDocs,doc,deleteDoc,addDoc} from 'firebase/firestore'
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

const firebaseConfig = {
    apiKey: "AIzaSyC0jL0t0cmeNGU8EyxSgnNja1poxKfTrqU",
    authDomain: "ammis-butterchicken.firebaseapp.com",
    projectId: "ammis-butterchicken",
    storageBucket: "ammis-butterchicken.appspot.com",
    messagingSenderId: "653707361851",
    appId: "1:653707361851:web:3a360724b075830c4de61e",
    measurementId: "G-MRVXJE05HK"
};

//import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";


// Build Firebase credential with the Google ID token.
//var id_token = googleUser.getAuthResponse().id_token
//const credential = GoogleAuthProvider.credential(id_token);

// Sign in with credential from the Google user.
//const auth = getAuth();
//signInWithCredential(auth, credential).catch((error) => {
  // Handle Errors here.
//  const errorCode = error.code;
//  const errorMessage = error.message;
  // The email of the user's account used.
 // const email = error.email;
  // The AuthCredential type that was used.
 // const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
//});

// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
const db = getFirestore(app2);

//const analytics = getAnalytics(app);

export default async function getMessages(){
  
    const messageCol = collection(db,'Menu')
    const messageSnapshot = await getDocs(messageCol)
    
    const messageList = messageSnapshot.docs.map(doc =>{
       let data = doc.data()
       data.docID = doc.id
       return data
    })
    return messageList
}

//hvad gør vi nu?!