const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminEmail : String,
    adminPassword : String
});



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin