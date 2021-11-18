
import express from "express";
import pug from "pug";

import getMessages from "../controller/firestore.js"

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';

//framework krævet for at læse req.body (brugt i post method)
import bodyParser from "body-parser";
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
  res.render('pug/header.pug', {message: 'message?' })
});

//PUG /menu
app.get('/menu', (req, res) => {
  res.render('pug/menu.pug', {message: 'message?' })
});

app.get('/pugtest', (req, res) => {
  getMessages().then(list => {
    res.render('pug/menu', list)
    console.log(list)
  });
});

//POST method til addToCart -- ligger produkt i session_memory 
app.post('/postdata', urlencodedParser,(req, res) => {
  let data = req.body
  let cart = req.session.cart || [];  
  console.log(data)

  cart.push(data);

  //console.log(req.session.cart)

  res.sendStatus(200)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
