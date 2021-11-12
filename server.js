
import express from "express";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()

const port = 3000

const __dirname = fileURLToPath(dirname(import.meta.url));

//app.set('view engine', 'pug')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile((__dirname) + "/public/HTML/index.html")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

