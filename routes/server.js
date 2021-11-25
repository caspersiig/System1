
import express from "express";
import pug from "pug";

import { quantity } from "../controller/quantityControl.js";
import getMessages from "../controller/firestore.js"
import {cartSum} from "../controller/cartSumControl.js"


import { dirname } from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';

//framework krævet for at læse req.body (brugt i post method)
import bodyParser from "body-parser";
import { get } from "http";
var urlencodedParser = bodyParser.urlencoded({ extended: false })


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
app.get('/', (req, res) => {
  let cart = req.session.cart || [];
  let cart_summary = cartSum(cart);

  res.render('pug/homepage.pug', {total: cart_summary.total, quantity: cart_summary.quantity})
});

//PUG /cart
app.get('/Cart', (req, res) => {
  let cart = req.session.cart || [];
  let cart_summary = cartSum(cart);

  let sorted_cart = quantity(cart);

  console.log(sorted_cart)

  res.render('pug/cart.pug', {  list: sorted_cart, total: cart_summary.total, quantity: cart_summary.quantity })
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
app.post('/postdata', urlencodedParser,(req, res) => {
  let data = req.body
  let cart = req.session.cart || [];
    
  cart.push(data);

  req.session.cart = cart;
  
  res.sendStatus(200)
})

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

