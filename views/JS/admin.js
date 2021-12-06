import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, signInWithPopup, GoogleAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { setDoc, doc,getFirestore,GeoPoint,updateDoc} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0jL0t0cmeNGU8EyxSgnNja1poxKfTrqU",
    authDomain: "ammis-butterchicken.firebaseapp.com",
    projectId: "ammis-butterchicken",
    storageBucket: "ammis-butterchicken.appspot.com",
    messagingSenderId: "653707361851",
    appId: "1:653707361851:web:3a360724b075830c4de61e",
    measurementId: "G-MRVXJE05HK"
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
        console.log(user)
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
        console.log("Request complete! response:", res.status);
        location.reload();
      });
}

document.getElementById("addmadvogne").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('madvogn');
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);
  const map1 = new Map();
  for (const [key, value] of params.entries()) {
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

  await updateDoc(docen, {
    capital: true
  });
  
}else{

}

})
