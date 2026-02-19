//richiamo express e la porta 

const express = require("express");
const app = express();
const port = 3000

//importo il router dei post salvandolo in una var

const routerPosts = require('./routers/posts');

//importo i middleware
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");


// attivazione della cartella public per uso file statici
app.use(express.static('public'));

// registro il body-parser per "application/json", mi servirà per modificare il body
app.use(express.json());

//chiamata

app.get("/", (req, res) => {
    res.send("dubug")
})

//istanza per rendere utilizzabili le rotte per posts

app.use('/posts' ,routerPosts)

//registro middleware per rotta inesistente

app.use(notFound)

//registro middleware dopo le rotte l'errore 500

app.use(errorsHandler)




app.listen(port, () => {
    console.log(`sono la porta in ascolto numero ${port}`);

})