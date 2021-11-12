
import express from "express";
import pug from "pug";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000

//ESSENTIAL -- (type: module) har ikke scopet til den globale variable __dirname
const __dirname = fileURLToPath(dirname(import.meta.url));

app.set('view engine', 'pug')

app.use(express.static('public'));


//HTML
app.get('/', (req, res) => {
    res.sendFile((__dirname) + "/public/HTML/index.html")
})


//PUG
app.get('/pug', (req, res) => {
  res.render('template', { title: 'PUG', message: 'CASPER SUTTER TISSEMAND' })
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

