const express = require('express');
const { getAllBooks, getSingleBook, addBook, updateAbook, deleteBook } = require('../controllers/booksControllers');
const router = express.Router()



router.get('/',getAllBooks);

router.get('/book/:id',getSingleBook);

router.post('/book',addBook);

router.patch('/book/:id',updateAbook);

router.delete('/book/:id',deleteBook);
  
module.exports = router