import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, signInWithPopup, GoogleAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { setDoc, doc,getFirestore,GeoPoint,updateDoc} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrkuV2MsSfgb4orDT3ZqsZuBYN4orI6EY",
  authDomain: "ammisbutterchicken-c1b39.firebaseapp.com",
  projectId: "ammisbutterchicken-c1b39",
  storageBucket: "ammisbutterchicken-c1b39.appspot.com",
  messagingSenderId: "506994635301",
  appId: "1:506994635301:web:97dca6d96d18e4f1fec5cc",
  measurementId: "G-MQL8W1ZZ8J"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

document.getElementById("login").addEventListener("click", ()=>{
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        send(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
});

async function send (user){
    await fetch("/admindata", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      }).then(res => {
          console.log(res)
        console.log("Request complete! response:", res.status);
        location.reload();
      });
}

document.getElementById("addmadvogne").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('madvogn');
  const formData = new FormData(form);
  const map1 = new Map();
  for (const [key, value] of formData.entries()) {
    map1.set(key,value)
    console.log(key)
  }

  let splice = map1.get('Placering').split(',')
  await setDoc(doc(db,'Madvogne',map1.get('madvogn')),{
    Adresse:map1.get('Adresse'),
    Beskrivelse:map1.get('Beskrivelse'),
    Placering:new GeoPoint ( splice[0] ,splice[1] )
  })
})

document.getElementById("addret").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('retmad');
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);
  const map1 = new Map();
  for (const [key, value] of params.entries()) {
    map1.set(key,value)
    console.log(key)
  }
  map1.get()
if(map1.get('undermenu') == ""){
  let tempret = map1.get('retnavn')
  let object = {"Beskrivelse":map1.get('beskrivelse'),"Pris":map1.get("pris")}
  let object2 = {}
  object2[tempret] = object

  await setDoc(doc(db,'Menu',map1.get('overmenu')),
  object2
  )
}else{
  let tempret = map1.get('retnavn')
  let object = {"Beskrivelse":map1.get('beskrivelse'),"Pris":map1.get("pris")}
  let object2 = {}
  object2[tempret] = object
  let object3 = {}
  object3[map1.get('undermenu')] = object2

  await setDoc(doc(db,'Menu',map1.get('overmenu')),
  object3
  )
}
})

document.getElementById("upretmad").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('formretmad');
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);
  const map1 = new Map();
  for (const [key, value] of params.entries()) {
    map1.set(key,value)
    console.log(key)
  }

  const docen = doc(db, "Menu", map1.get('overmenu'));
  if(map1.get('undermenu') == ""){
    let tempret = map1.get('retnavn')
    let object = {"Beskrivelse":map1.get('beskrivelse'),"Pris":map1.get("pris")}
    let object2 = {}
    object2[tempret] = object

  await updateDoc(docen, 
    object2
  );

}else{
  let tempret = map1.get('retnavn')
  let object = {"Beskrivelse":map1.get('beskrivelse'),"Pris":map1.get("pris")}
  let object2 = {}
  object2[tempret] = object
  let object3 = {}
  object3[map1.get('undermenu')] = object2

  await updateDoc(docen, 
    object3
  );
}
})


document.getElementById("upmadvogne").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('formmadvogn');
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);
  const map1 = new Map();
  for (const [key, value] of params.entries()) {
    map1.set(key,value)
    console.log(key)
  }

  let splice = map1.get('Placering').split(',')
  await updateDoc(doc(db,'Madvogne',map1.get('madvogn')),{
    Adresse:map1.get('Adresse'),
    Beskrivelse:map1.get('Beskrivelse'),
    Placering:new GeoPoint ( splice[0] ,splice[1] )
  })
})

let elementsArray = document.querySelectorAll("sletField");

elementsArray.forEach(function(elem) {
  console.log(elem)
    elem.addEventListener("click", function() {
        console.log("elem.data")
    });
});


let elementsArray2 = document.querySelectorAll("sletDoc");

elementsArray2.forEach(function(elem) {
    elem.addEventListener("click", function() {
      console.log(elem.data)

    });
});