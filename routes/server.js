import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import pug from "pug";

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_KEY_TEST);


import nodemailer from 'nodemailer';

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

//---------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ STANDARD ROUTES -----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

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



//---------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ CRUD ITEM-CART -----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
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
  // hvis antal af varer af samme varer er større end en, vil alle de samme varer slettes
  let itemFound = cart.find(element => element.titel == data.titel)
  if (data.titel == itemFound.titel && data.quan > 1) {
    cart.splice(cart.findIndex(element => element.titel == data.titel), data.quan);
  } else {
    cart.splice(cart.findIndex(element => element.titel == data.titel), 1);
  }
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

//---------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ ADMIN SIDE / FIREBASE CRUD -----------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

app.get('/admin',async (req, res) => {
  if(req.session.accessToken == null){
    res.render('pug/admin.pug')
  }else{
    let fetch = await getMadvogne();
    res.render('pug/adminHemlig.pug',{navn:req.session.navn,madvogn:fetch})
  }
});

app.post('/admindata', (req, res) => {
  let data = req.body
  console.log(data.uid)
  if(data.email == "caspersiig@gmail.com" && data.uid == "l3vlcvzi67eY67DKCJuRq2oIfeZ2" && data.emailVerified || data.email == "ammisbutterchicken@gmail.com" && data.uid == "cQSNB8ZTWDc8Kk3mN9kaxdo0z9C3" && data.emailVerified){
    //accesstoken giver dig sjovt nok adgang til hjemmesiden så længde den er aktiv :wauw:
    req.session.navn = data.displayName
    req.session.uid = data.uid
    req.session.accessToken = data.stsTokenManager.accessToken
    res.sendStatus(200)
  }else{
    res.sendStatus(404)
  }
});

//---------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ NODEMAILER ---------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

app.get('/contact', (req, res) => {
    let cart = req.session.cart || [];
    let cart_summary = cartSum(cart);

    res.render("pug/kontakt.pug", {total: cart_summary.total, quantity: cart_summary.quantity})
});

app.post('/send-contact-form', async (reg, res) => {
  console.log(reg.body);

  const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com", //replace with your email provider
   port: 587,
   secureConnection: false,
      auth:{
          user: process.env.GMAIL_MAIL,
          pass: process.env.GMAIL_PASSWORD
      }
  })

  const mailOptions = {
      from: reg.body.email,
      to: process.env.GMAIL_RECEIVER_TEST,
      subject: `From: ${reg.body.email} || Subject: ${reg.body.emne}`,
      text: reg.body.tekst +"\nName: "+ reg.body.navn +"\n"+ `From: ${reg.body.email}`
  }

  transporter.sendMail(mailOptions, (err, info) => {
      if(err){
       console.log(err);
       res.send('error');
      }
      else{ 
          res.send('Email succesfully sent');
          res.redirect('/')
      }
  })
});


//---------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ STRIPE -------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

app.get("/stripe-order-succesful&verified", (req, res) => {
  let navn = "Thomas Taulo";
  let tidspunkt = "14:55";
  res.render("pug/succes_url.pug", {navn:navn, tidspunkt: tidspunkt});
})

app.get("/stripe-order-negated", (req, res) => {
  res.render("pug/cancel_url.pug");
})

app.post('/create-checkout-session', async (req, res) =>{
  let cart = req.session.cart || [];

  let sorted_cart = quantity(cart);

   try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: sorted_cart.map((item) => {
        return {
          price_data: {
            currency: 'dkk',
            product_data: {
              name: item.titel,
              images: []
            },
            unit_amount: item.pris * 100,
          },
          quantity: item.quantity
        }
      }),
      success_url: 'http://localhost:3000/stripe-order-succesful&verified',
      cancel_url: 'http://localhost:3000/stripe-order-negated'
    })
    res.json({ url: session.url })
  } catch (e) {
    console.log({ error: e.message })
    res.status(500)
    return;
  }
})

//---------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ 404 Fejlhåndtering -------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

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

