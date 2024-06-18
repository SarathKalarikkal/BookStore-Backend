const express = require('express')
const router = express.Router()
const {getAllAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor} = require('../controllers/authorController')

router.get('/',getAllAuthors);

  router.get('/author/:id', getAuthor);

  router.post('/author',addAuthor);

  router.patch('/author/:id',updateAuthor);

  router.delete('/author/:id',deleteAuthor);
  
module.exports = router