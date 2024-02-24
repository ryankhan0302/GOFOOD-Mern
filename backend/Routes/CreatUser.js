const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
const jwtSecret="Mynameisryankhan$#";
router.post("/createuser",
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 })
  ],
  async (req, res) => {
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const salt= await bcrypt.genSalt(10);
      let secPasaword = await bcrypt.hash(req.body.password,salt)

try{
      await User.create({
        name: req.body.name,
        password: secPasaword,
        email: req.body.email,
        location: req.body.location
      });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });


//---LOGIN USER PART ---//



router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try logging with correct email" });
    }
 const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
  if (!pwdCompare) {
      return res.status(400).json({ errors: "Try logging with correct password" });
    }

const data={
  user:{
    id:userData.id
  }
}

const authToken=jwt.sign(data,jwtSecret);

    return res.json({ success: true ,authToken:authToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
