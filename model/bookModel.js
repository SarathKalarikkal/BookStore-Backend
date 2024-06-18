const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName:{ type: String, required: true, unique: true },
    image:"string",
    publishedAt: "Date",
    author : "String",  
    description : "String",
    price : 'Number'
  });




const Books = mongoose.model('Books', bookSchema);

module.exports = Books