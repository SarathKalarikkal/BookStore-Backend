const Books = require("../model/bookModel");

//------------------------Get all the books from DB------------------------
const getAllBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;  // Default limit to 8 if not provided
    const sortOrder = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : null;

    let query = Books.find({});
    
    if (sortOrder !== null) {
      query = query.sort({ price: sortOrder });
    }
    
    query = query.limit(limit);

    const books = await query;
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error });
  }
};



  //------------------------Get a single book by id from DB------------------------
const getSingleBook =async(req, res)=> {
  const book =  await Books.findById(req.params.id);
  if (book) {
    res.status(404).json(book)
  } else {
    res.status(404).send('Book not found');
  }
}



//------------------------Add a books to DB------------------------
  const addBook = async (req, res) => {
    try {
      const { bookName, image, publishedAt, author, description, price } = req.body;

      const existingBook = await Books.findOne({ bookName });

      if (existingBook) {
        return res.status(400).json({ message: "Book already exists" });
      }

     if(!existingBook){
      await Books.create({
        bookName: bookName,
        image: image,
        publishedAt: publishedAt,
        author: author,
        description: description,
        price: price
      });
      res.json("Book added successfully");
     }   
   

    } catch (error) {
      res.status(500).json({ message: "Failed to add book", error: error });
    }
  }



  //------------------------Update a book by id from DB------------------------
  const updateAbook = async (req, res) => {
      try {
          const book = await Books.findById(req.params.id);
          if (book) {
              const {bookName, image, publishedAt,author, description, price } = req.body;
              await book.updateOne({
                bookName: bookName, 
                image: image,
                publishedAt :publishedAt,
                author : author,
                description : description,
                price : price
              })
              res.json(book)
          } else {
              res.json({ message: "Book not found" })
          }
      } catch (error) {
          res.status(500).json({ message: "Failed to update book", error: error });
      }
  }


  //------------------------Delete a book by id from DB------------------------
  const deleteBook =async(req, res)=> {
     const book =  await Books.findById(req.params.id);
     if (book) {
       await book.deleteOne();
       res.json({message :'Book deleted successfully'});
     } else {
       res.status(404).json({message : 'Book not found'});
     }
  }


module.exports = {getAllBooks, getSingleBook, addBook, updateAbook,deleteBook}