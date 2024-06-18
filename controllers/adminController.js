const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModal');



//------------------------Create admin from DB------------------------
const addAdmin = async (req, res) => {

    const {adminEmail, adminPassword} = req.body

    const isAdmin = await Admin.findOne({adminEmail: adminEmail})

    if(!isAdmin){

         const hashedPassword = await bcrypt.hash(adminPassword, 10)

        const admin = await Admin.create({
            adminEmail: adminEmail,
            adminPassword: hashedPassword
        })
        return res.status(201).json(admin)

        // return res.status(201).json({message: "Admin Credentials Added"})
    }
    if(isAdmin){
        return res.status(400).json({message: "Admin already exist"})
    }


}


//------------------------Get admin from DB------------------------
const loginAdmin = async (req,res)=>{

    const {adminEmail, adminPassword} = req.body

    try {
         let admin = await Admin.findOne({ adminEmail: adminEmail })

         if(!admin){
            return res.status(400).json({message : "Invalid Admin credentials"})
         }

         const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword)

         if(!isMatch){
            return res.status(400).json({message : "Invalid Password"})
         }

         const secretKey = process.env.SECREATE_KEY_ADMIN
         const token = jwt.sign({ adminId: admin._id }, secretKey, { expiresIn: '1h' });

         res.cookie('adminToken', token, { httpOnly: true })
         res.json({ message: "Logged in successfully" })

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }

}




module.exports = {loginAdmin, addAdmin}  