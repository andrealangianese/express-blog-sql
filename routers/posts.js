//richiamo express per usarlo

const express= require("express");

//creo una var in cui salvare le rotte di express

const router = express.Router();

//importo il controller dei post

const postController = require('../controllers/postControllers')

//creo  rotte crud

// index
router.get('/', postController.index);

// show
router.get('/:id', postController.show);

// store
router.post('/', postController.store);

// update
router.put('/:id', postController.update);

// modify
router.patch('/:id', postController.modify);

// destroy
router.delete('/:id', postController.destroy)

//rendo importabili da altri componenti queste rotte 

module.exports = router