import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, signInWithPopup, GoogleAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { setDoc, doc,getFirestore,GeoPoint,updateDoc,deleteDoc} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

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
  }

  let splice = map1.get('Placering').split(',')
  await setDoc(doc(db,'Madvogne',map1.get('madvogn')),{
    Adresse:map1.get('Adresse'),
    Beskrivelse:map1.get('Beskrivelse'),
    Placering:new GeoPoint ( splice[0] ,splice[1] )
  })
  location.reload()
})
// noget der
document.getElementById("addret").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('retmad');
  const formData = new FormData(form);
  const map1 = new Map();
  for (const [key, value] of formData.entries()) {
    map1.set(key,value)
  }
  map1.get()
  //if undermenu eller else ingen undermenu
if(map1.get('undermenu') == ""){
 //object der bliver added bliver gjort klar så den bare mangler overmenu
 let tempret = map1.get('retnavn')
 let object = {"Beskrivelse":map1.get('beskrivelse'),"Pris":map1.get("pris")}
 let object3 = {}
 object3[tempret] = object

 // tager alle andre madder under overmenu'en og gør dem klar til at komme med overmenu'en

 let elementsArray2 = document.querySelectorAll(".overmenu");
 elementsArray2.forEach(function(elem) {
   let data = elem.attributes.data.nodeValue.split('*')
   if(data[0] == map1.get('overmenu')){
     let tempobject = {"Beskrivelse":data[data.length-2],"Pris":data[data.length-1]}
     //temp object er klar til indten at få en under menu hvis den skal have sådan en
     if(data.length == 5){
       let tempobject2 = {}
       tempobject2[data[data.length-3]] = tempobject
       if(Object.keys(object3).includes(data[data.length-4])!= false){
         object3[data[data.length-4]][data[data.length-3]] = tempobject
         //object3.undermenu.
       }else{
         //giver temp object sin egen unike undermenu          
         object3[data[data.length-4]] = tempobject2
       }
     }else{
       object3[data[data.length-3]] = tempobject
     }
   }
 });

 await setDoc(doc(db,'Menu',map1.get('overmenu')),
 object3
 )

}else{
  //object der bliver added bliver gjort klar så den bare mangler overmenu
  let tempret = map1.get('retnavn')
  let object = {"Beskrivelse":map1.get('beskrivelse'),"Pris":map1.get("pris")}
  let object2 = {}
  object2[tempret] = object
  let object3 = {};
  object3[map1.get('undermenu')] = object2

  // tager alle andre madder under overmenu'en og gør dem klar til at komme med overmenu'en

  let elementsArray2 = document.querySelectorAll(".overmenu");
  elementsArray2.forEach(function(elem) {
    let data = elem.attributes.data.nodeValue.split('*')
    if(data[0] == map1.get('overmenu')){
      let tempobject = {"Beskrivelse":data[data.length-2],"Pris":data[data.length-1]}
      //temp object er klar til indten at få en under menu hvis den skal have sådan en
      if(data.length == 5){
        let tempobject2 = {}
        tempobject2[data[data.length-3]] = tempobject
        if(Object.keys(object3).includes(data[data.length-4])!= false){
          object3[data[data.length-4]][data[data.length-3]] = tempobject
          //object3.undermenu.
        }else{
          //giver temp object sin egen unike undermenu          
          object3[data[data.length-4]] = tempobject2
        }
      }else{
        object3[data[data.length-3]] = tempobject
      }
    }
  });

  await setDoc(doc(db,'Menu',map1.get('overmenu')),
  object3
  )
}
location.reload()
})

document.getElementById("upretmad").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('formretmad');
  const formData = new FormData(form);
  const map1 = new Map();
  for (const [key, value] of formData.entries()) {
    map1.set(key,value)
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
location.reload()
})

document.getElementById("upmadvogne").addEventListener("click", async (event)=>{
  event.preventDefault();
  const form = document.getElementById('formmadvogn');
  const formData = new FormData(form);
  const map1 = new Map();
  for (const [key, value] of formData.entries()) {
    map1.set(key,value)
  }

  let splice = map1.get('Placering').split(',')
  await updateDoc(doc(db,'Madvogne',map1.get('madvogn')),{
    Adresse:map1.get('Adresse'),
    Beskrivelse:map1.get('Beskrivelse'),
    Placering:new GeoPoint ( splice[0] ,splice[1] )
  })
  location.reload()
})

let elementsArray = document.querySelectorAll(".sletField");

elementsArray.forEach(function(elem) {
    elem.addEventListener("click", (event)=>{sletField(event)})
});


let elementsArray2 = document.querySelectorAll(".sletDoc");

elementsArray2.forEach(function(elem) {
    elem.addEventListener("click", (event)=>{sletDoc(event)});
});

async function sletField(elemt) {
  let data = elemt.srcElement.attributes.data.nodeValue.split(',')

// Remove the 'capital' field from the document

  await setDoc(doc(db,'Menu',data[0]),
  {[data[1]]:""}
  )
  location.reload()
}

async function sletDoc(elemt) {
  let data = elemt.srcElement.attributes.data.nodeValue.split(',')
  if(data.length < 2){
    await deleteDoc(doc(db, "Madvogne", data[0]));
  }else{
    await setDoc(doc(db,'Menu',data[0]),
    {[data[1]]:""}
    )
  }
  location.reload()
}