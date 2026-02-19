//importo valori posts

const valoriPosts = require('./../posts')

//creo  rotte crud

// index
function index(req, res) {
    // confronto, all'inizio avranno lo stesso valore

    let postFiltrati = valoriPosts

    if(req.query.tag){
        postFiltrati = valoriPosts.filter(
            post => post.tags.includes(req.query.tag)
        )
    }

    res.json({
        count: postFiltrati.length,
        posts: postFiltrati
    })
};

// show
function show(req, res) {

    //var per salvare id

    const idPosts = parseInt(req.params.id)

    //confronto il valore di id

    const post = valoriPosts.find(p => p.id === idPosts)

    if (post === undefined){
        res.status(404)

        res.json("il post non esiste")
    }

    
    res.json(post);
};

// store
function store(req, res) {
    
    //creazione del nuovo id da inserire
    const idUpdate = valoriPosts[valoriPosts.length - 1].id +1;

    //creo un nuovo post per il blog
    const newPost = {
        id : idUpdate,
        title : req.body.title,
        image : req.body.image,
        content :req.body.content,
        tags : req.body.tags
    }

    //aggiungo newPost al blog

    valoriPosts.push(newPost);

    //stampo in console per ulteriore verifica

    console.log(valoriPosts);
    
    //ritorno lo status corretto e il nuovopost
    res.status(201);
    res.json(newPost)
};

// update
function update(req, res) {
    
    //trasformo id in numero
    const id = parseInt(req.params.id)
    
    //confronto id con post

    const postUp = valoriPosts.find(post => post.id === id)

    if (postId === undefined){

        //se non uso return non interrompo la funzione quindi non vedrò l'errore 404

        return res.status(404)
    }

    //aggiorno post
    postUp.title = req.body.title;
    postUp.content = req.body.content;
    postUp.image = req.body.image
    postUp.tags = req.body.tags;

    //stampo in console 
    console.log(valoriPosts);

    //restituisco i post aggiornati
    res.json(postUp)
    
};

// modify
function modify(req, res) {
    //trasformo id in numero
    const id = parseInt(req.params.id)
    
    //confronto id con post

    const postMod = valoriPosts.find(post => post.id === id)

    //imposto errore per vedere se fnziona 

    throw new Error('Errore nel test del middleware')

    if (postMod === undefined){

        //se non uso return non interrompo la funzione quindi non vedrò l'errore 404

        return res.status(404)
    }

    //se ci sono contencontenti aggiungo col ternario

    req.body.title ? postMod.title =req.body.title : postMod.title = postMod.title
    req.body.content ? postMod.content =req.body.content : postMod.content = postMod.content
    req.body.image ? postMod.image =req.body.image : postMod.image = postMod.image
    req.body.tags ? postMod.tags =req.body.tags : postMod.tags = postMod.tags


    res.json(postMod)
};

// destroy
function destroy(req, res){

    //trasformo id in numero
    const id = parseInt(req.params.id)
    
    //confronto id con post

    const postId = valoriPosts.find(post => post.id === id)

    if (postId === undefined){

        //se non uso return non interrompo la funzione quindi non vedrò l'errore 404

        return res.status(404)
    }

    //rimuovo valorePost dai post 
    valoriPosts.splice(valoriPosts.indexOf(postId), 1);

    //forzo status 204 secondo condizioni di rest

    res.sendStatus(204)

};

//rendo importabili da altri componenti queste rotte 

module.exports = {index , store, update, modify , destroy, show}