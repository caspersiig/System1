//**************************************************************************** */

// Import the functions you need from the SDKs you need

import { async } from "@firebase/util";

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";



// import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection,getDocs,doc,deleteDoc,addDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDrkuV2MsSfgb4orDT3ZqsZuBYN4orI6EY",
  authDomain: "ammisbutterchicken-c1b39.firebaseapp.com",
  projectId: "ammisbutterchicken-c1b39",
  storageBucket: "ammisbutterchicken-c1b39.appspot.com",
  messagingSenderId: "506994635301",
  appId: "1:506994635301:web:97dca6d96d18e4f1fec5cc",
  measurementId: "G-MQL8W1ZZ8J"
};


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

