const User = require('../models/User')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const JWT_SECRET = 'me is a good boi';

//Route 1: create a user using :POST "/api/auth/createuser" doesn't require auth
router.post('/createuser',[
    body('email','Enter a valid name').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    //check whether the user with the same email exists already
    let user =await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:'A user with this email already exists'})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password , salt) ;

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user:{
            user:user.id
        }
    }
      const authToken = jwt.sign(data,JWT_SECRET);
      
      res.json({authToken});

    //   res.json({user})
    }catch(error){
        console.error(error.message);
        res.status(500).send('some message occured')
      
    //   .then(user => res.json(user)).catch(err=>
    //      { console.log(err) 
    //     res.json({error:'Please enter a unique value for email'})}
    //   )
    }
})


//Route 2:authenticate a user using :POST "/api/auth/login" doesn't require auth
router.post('/login',[
    body('email','Enter a valid name').isEmail() ,
    body('password','Password cannot be empty').exists(),
], async (req,res)=>{
    //check for errors and send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
}

const { email,password } = req.body;
try{
    let user =await User.findOne({email});
    if(!user){
        return res.status(400).json({error:'user credentials are incorrect'});
    }
    const passwordCompare =await bcrypt.compare(password, user.password);

    if(!passwordCompare){
        return res.status(400).json({error:'user credentials are incorrect'});

    }
    const data = {
        user:{
            user:user.id
        }
    }

     const authToken = jwt.sign(data,JWT_SECRET);
     res.json({authToken});
} 
catch (error){
    console.error(error.message);
    res.status(500).send('internal server error')
}
});

//Route 3: get logged in user details using :POST "/api/auth/getUser" require login
router.post('/getUser', async (req,res)=>{
try {
    userId = 'todo';
    const user = await User.findById(userId).select("-password");
    
} catch (error){
    console.error(error.message);
    res.status(500).send('internal server error')
}
});


module.exports = router;