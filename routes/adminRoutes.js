const express = require('express')
const router = express.Router()
const {loginAdmin, addAdmin}  = require('../controllers/adminController');


router.post('/login',loginAdmin);
router.post('/login/add',addAdmin);

  
module.exports = router