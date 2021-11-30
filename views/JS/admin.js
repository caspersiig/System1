import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, signInWithPopup, GoogleAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'

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

document.getElementById("login").addEventListener("click", ()=>{
    const auth = getAuth();
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
    console.log("sender login")
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
