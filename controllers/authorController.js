const Author = require("../model/authorModel")

//------------------------Get all the authors from DB------------------------
const getAllAuthors = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const authors = await Author.find({}).limit(limit);
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch authors", error: error });
  }
};




  //------------------------Get a author from DB------------------------
const getAuthor = async(req, res)=> {
   const author  = await Author.findById(req.params.id)
   if(author){
    res.status(404).json(author)
  } else {
    res.status(404).send('author not found');
  }
  }



 //------------------------Add an author to DB------------------------ 
const addAuthor = async (req, res) => {
  try {
      const { authorName, image, description, booksWritten } = req.body;

     const existingAuthor  = await Author.findOne({authorName})

     if(existingAuthor){
      return res.status(400).json({ message: "Author already exists" });
     }

     if(!existingAuthor){
      await Author.create({
        authorName: authorName,
        image: image,
        description: description,
        booksWritten: booksWritten
    });
    res.status(201).json("Author added successfully");
     }
      
  } catch (error) {
      res.status(500).json({ message: "Failed to add author", error: error.message });
  }
};

//------------------------Update an existing author in DB------------------------
const updateAuthor = async (req, res) => {
  try {
      const authorId = req.params.id;
      const { authorName, image, description, booksWritten } = req.body;
      const updatedAuthor = await Author.findByIdAndUpdate(authorId, {
          authorName: authorName,
          image: image,
          description: description,
          booksWritten: booksWritten
      }, { new: true }); // Return the updated author document after update

      if (!updatedAuthor) {
          return res.status(404).json({ message: "Author not found" });
      }
      
      res.json(updatedAuthor);
  } catch (error) {
      res.status(500).json({ message: "Failed to update author", error: error.message });
  }
};
  //------------------------Delete a author from DB------------------------
const deleteAuthor = async(req, res)=> {
    const author = await Author.findById(req.params.id)
    if(author){
      await author.deleteOne()
      res.send('Author deleted successfully');
    }else{
      res.status(404).send('Author not found');
    }
  }  
module.exports = {getAllAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor}  