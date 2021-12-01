
import express from "express";
import pug from "pug";

import { quantity } from "../controller/quantityControl.js";
import {getMessages,getMadvogne} from "../controller/firestore.js"
import {cartSum} from "../controller/cartSumControl.js"


import { dirname } from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';

//framework krævet for at læse req.body (brugt i post method)
import bodyParser from "body-parser";
import { get } from "http";
import { connectFirestoreEmulator } from "@firebase/firestore";

const app = express()
const port = 3000

//ESSENTIAL -- (type: module) har ikke scopet til den globale variable __dirname
const filepath = dirname(fileURLToPath(import.meta.url));
const __dirname = filepath.substring(0,filepath.length-7);

app.set('view engine', 'pug')

app.use(session({ secret: 'hemmelig', saveUninitialized: true, resave: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('views'));


//HTML
/* app.get('/', (req, res) => {
    res.sendFile((__dirname) + "/views/HTML/index.html")
}); */


//PUG /home
app.get('/', async(req, res) => {
  let cart = req.session.cart || [];
  let cart_summary = cartSum(cart);

  let session_madvogne = req.session.madvogne || [];

  if(req.session.madvogne == undefined){
    let fetch = await getMadvogne();
    fetch.forEach(ele =>{
      session_madvogne.push(ele)
    })
  }
    req.session.madvogne = session_madvogne;

  res.render('pug/homepage.pug', {total: cart_summary.total, quantity: cart_summary.quantity,kort:JSON.stringify(req.session.madvogne)})
});

//PUG /cart
app.get('/Cart', (req, res) => {
  let cart = req.session.cart || [];
  let cart_summary = cartSum(cart);

  let sorted_cart = quantity(cart);
    
  req.session.cart = cart;

  //console.log(sorted_cart)

  res.render('pug/cart.pug', {list: sorted_cart, total: cart_summary.total, quantity: cart_summary.quantity})
});

//PUG /menu
app.get('/menu', async (req, res) => {

  let cart = req.session.cart || [];
  let cart_summary = cartSum(cart);

  let session_menu = req.session.menu || [];

  if(req.session.menu == undefined){
    let fetch = await getMessages();
    fetch.forEach(ele =>{
      session_menu.push(ele)
    })
    
    req.session.menu = session_menu;
  };

  //console.log(req.session.menu)

  res.render('pug/menu.pug', {items:session_menu, total: cart_summary.total, quantity: cart_summary.quantity}) // items er faktisk et array i know its crazy --Oliver: mate du er crazy

});

//POST method til addToCart -- ligger produkt i session_memory 
//man kan altid diskutere for at dette burde være cookies istedet for session men så igen det har vi jo ikke lært noget om
app.post('/postdata',(req, res) => {
  let data = req.body

  //console.log("Body: " + data)

  let cart = req.session.cart || [];
  //console.log("Cart " + cart)  

  cart.push(data);
  req.session.cart = cart;
  res.sendStatus(200)
});

app.delete('/deleteData',(req, res) => {
  let data = req.body
  let cart = req.session.cart || []; 

  // sletter/splicer det element der bliver fundet i det givne array og givende indeks
  cart.splice(cart.findIndex(element => element.titel == data.index), 1);

  req.session.cart = cart;
  
  res.sendStatus(200)
})


app.post('/updateItemQuantity', (req, res) => {
  let data = req.body
  let cart = req.session.cart || []; 

  let index = cart.findIndex(item => item.titel == data.object.titel);

  if(data.do === "delete"){
    cart.splice(index, 1)
  }else{
    cart.push(data.object)
  }

  req.session.cart = cart;
  
  res.sendStatus(200)
})


app.get('/admin', (req, res) => {
  if(req.session.accessToken == null){
    res.render('pug/admin.pug')
  }else{
    res.render('pug/adminHemlig.pug',{navn:req.session.navn})
  }
});

app.post('/admindata', (req, res) => {
  let data = req.body
  if(data.email == "caspersiig@gmail.com" && data.uid == "l3vlcvzi67eY67DKCJuRq2oIfeZ2" && data.emailVerified){
    //accesstoken giver dig sjovt nok adgang til hjemmesiden så længde den er aktiv :wauw:
    req.session.navn = data.displayName
    req.session.accessToken = data.stsTokenManager.accessToken
    res.sendStatus(200)
  }else{
    res.sendStatus(404)
  }
});

//fejl håndtering
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('pug/404', { url: req.url });
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

