const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//------------------------Get all the Users from DB------------------------
const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}



  //------------------------Get a User from DB------------------------
const getUser = async(req, res)=> {
   const user  = await User.findById(req.params.id)
   if(User){
    res.status(404).json(user)
  } else {
    res.status(404).send('User not found');
  }
  }



 //------------------------Add a User to DB------------------------ 
  const addUser= async(req, res)=> {
    try {
       const {userName, userEmail, password, shippingAddress, about} = req.body
      
       const hashedPassword = await bcrypt.hash(password, 10)

       const user = await User.create({
        userName : userName,
        userEmail : userEmail,
        password:hashedPassword,
        shippingAddress : shippingAddress,
        about : about
       })
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: "Failed to add User", error: error });
    }
  }

  


  //------------------------Update a existing User from DB------------------------
const updateUser =async(req, res)=> {
   try {
       const user = await User.findById(req.params.id)
       if(user){
        const {userName, userEmail, password} = req.body
        await user.updateOne({
            userName : userName,
            userEmail : userEmail,
            password: password
         })
         res.json(user)
       }
   } catch (error) {
    res.json({ message: "User not found" })
   }
  }



  //------------------------Delete a User from DB------------------------
const deleteUser = async(req, res)=> {
    const user = await User.findById(req.params.id)
    if(user){
      await user.deleteOne()
      res.send('User deleted successfully');
    }else{
      res.status(404).send('User not found');
    }
  }  





// ----------------------------signup-----------------------------------------------



  const signupUser = async (req, res) => {
    try {
      const { userName, userEmail, password } = req.body;
  

      if(!userName || !userEmail || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
      }     

      const existingUser = await User.findOne({ userEmail: userEmail });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        userName: userName,
        userEmail: userEmail,
        password: hashedPassword,
      });
  
      res.json({ message: "Signup successfull", user: user });

    } catch (error) {
      res.status(500).json({ message: "Failed to signup", error: error.message });
    }
  };
  



// ----------------------------Login------------------------------------------------


const loginUser = async (req,res)=>{

    const {userEmail, password} = req.body

    if(!userEmail || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    } 

    try {
         let user = await User.findOne({ userEmail: userEmail })
          
         if(!user){
            return res.status(400).json({message : "Invalid Username or Email"})
         }
         
         const isMatch = await bcrypt.compare(password, user.password)
         
         if(!isMatch){
            return res.status(400).json({message : "Invalid Password"})
         }

         const secretKey = process.env.SECREATE_KEY 
         const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); 
           
         res.cookie('userToken', token, { httpOnly: true })
         res.json({ message: "Logged in successfully" })

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }

}





module.exports = {getAllUsers, getUser, addUser, updateUser, deleteUser, signupUser, loginUser}  