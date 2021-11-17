
import express from "express";
import pug from "pug";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000

//ESSENTIAL -- (type: module) har ikke scopet til den globale variable __dirname
const __dirname = fileURLToPath(dirname(import.meta.url));

app.set('view engine', 'pug')

app.use(express.static('views'));


//HTML
/* app.get('/', (req, res) => {
    res.sendFile((__dirname) + "/public/HTML/index.html")
}); */


//PUG
app.get('/', (req, res) => {
  res.render('pug/header.pug', {message: 'CASPER has aine Genitalia ^.^' })
});

app.get('/pugtest', (req, res) => {

  getMessages().then(list => {
    res.render('menu', list)
    //console.log(list[0].Børnemenu.Pris)
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

