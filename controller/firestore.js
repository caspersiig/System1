//**************************************************************************** */

// Import the functions you need from the SDKs you need

import { async } from "@firebase/util";

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";



// import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection,getDocs,doc,deleteDoc,addDoc,setDoc} from 'firebase/firestore'
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

const firebaseConfig = {
  apiKey: "AIzaSyDrkuV2MsSfgb4orDT3ZqsZuBYN4orI6EY",
  authDomain: "ammisbutterchicken-c1b39.firebaseapp.com",
  projectId: "ammisbutterchicken-c1b39",
  storageBucket: "ammisbutterchicken-c1b39.appspot.com",
  messagingSenderId: "506994635301",
  appId: "1:506994635301:web:97dca6d96d18e4f1fec5cc",
  measurementId: "G-MQL8W1ZZ8J"
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

export async function getMessages(){
  
    const messageCol = collection(db,'Menu')
    const messageSnapshot = await getDocs(messageCol)
    
    const messageList = messageSnapshot.docs.map(doc =>{
       let data = doc.data()
       data.docID = doc.id
       return data
    })
    
    const map1 = new Map();
    messageList.map(test =>{
      map1.set(test.docID,test);
    })
    return map1;
  }

  export async function getMadvogne(){
  
    const messageCol = collection(db,'Madvogne')
    const messageSnapshot = await getDocs(messageCol)
    
    const messageList = messageSnapshot.docs.map(doc =>{
       let data = doc.data()
       data.docID = doc.id
       return data
    })
    
    const map1 = new Map();
    messageList.map(test =>{
      map1.set(test.docID,test);
    })
    return map1;
  }

//hvad gør vi nu?!