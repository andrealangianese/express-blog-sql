//importo il file di connessione al database

const connection = require('./../data/db-new')

//importo valori posts

const valoriPosts = require('./../posts')

//creo  rotte crud

// index
function index(req, res) {
    //preparo la query

    const sql = 'SELECT * FROM `posts`';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}
// show
function show(req, res) {

    //var per salvare id

    const id = parseInt(req.params.id)

    //salvo in una var la query sql
    const sql = 'SELECT * FROM `posts` WHERE id = ?';

    const postSql = `SELECT tags.*
        FROM tags
        JOIN post_tag ON post_tag.tag_id = tags.id
         WHERE post_tag.post_id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Pizza not found' })

        //recupero l'eventuale risultato

        const post = results[0];
        // res.json(post);

        // facciamo partire seconda query di join se la prima ha avuto successo
        connection.query(postSql, [id], (err, postResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggoiungiamo gli ingredienti alla pizza
            post.tags = postResults;
            res.json(post);
        })
    })
};

    // store
    function store(req, res) {

        //creazione del nuovo id da inserire
        const idUpdate = valoriPosts[valoriPosts.length - 1].id + 1;

        //creo un nuovo post per il blog
        const newPost = {
            id: idUpdate,
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
            tags: req.body.tags
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

        if (postId === undefined) {

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

        if (postMod === undefined) {

            //se non uso return non interrompo la funzione quindi non vedrò l'errore 404

            return res.status(404)
        }

        //se ci sono contencontenti aggiungo col ternario

        req.body.title ? postMod.title = req.body.title : postMod.title = postMod.title
        req.body.content ? postMod.content = req.body.content : postMod.content = postMod.content
        req.body.image ? postMod.image = req.body.image : postMod.image = postMod.image
        req.body.tags ? postMod.tags = req.body.tags : postMod.tags = postMod.tags


        res.json(postMod)
    };

    // destroy
    function destroy(req, res) {

        //trasformo id in numero
        const id = parseInt(req.params.id)


        const sql = 'DELETE FROM `posts` WHERE id = ?';

        // elimino un post dal blog

        connection.query(sql, [id], (err) => {
            if (err) return res.status(500).json({ message: 'non l\'hai ancora eliminata!!' })
            res.sendStatus(204)
        })




    };

    //rendo importabili da altri componenti queste rotte 

    module.exports = { index, store, update, modify, destroy, show }