const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    password: { type: String, required: true },
    shippingAddress : {type: String},
    about : {type: String}
  });



const User = mongoose.model('User', userSchema);

module.exports = User