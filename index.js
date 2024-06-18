const express = require('express')
const mongoose = require('mongoose');
const app = express()
const booksRoutes = require('./routes/booksRoutes')
const authorRoutes = require('./routes/authorRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cors = require('cors');
require('dotenv').config()


const PORT = process.env.PORT

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true, origin : true
}));


app.use('/books', booksRoutes)
app.use('/authors',authorRoutes )
app.use('/users',userRoutes )
app.use('/admin',adminRoutes )



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});


main().then(()=>console.log("Connected")).catch(err => console.log(err));

async function main() {
  
  await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);
}