const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');


const registerSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const Register=mongoose.model('register',registerSchema);

mongoose.connect('mongodb://127.0.0.1:27017/userInfo',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//we need secret key for more protection

const secretKey='your-secret-key';
//email validation
const validateEmail=(email)=>{
    const emailRegex=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email)
}

//password validation

const validPassword=(password)=>{
    const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
    return passwordRegex.test(password);
}




router.get('/',async(req,res)=>{
    try {
        const user=await Register.find()
           
        res.status(200).json({message:"User access"});
    } catch (error) {
        res.status(404).json({message:"Bad Request"})
    }
})


router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email && !password){
        return res.status(400).json({ message: 'Email and password are required' });
    }
   //finding email inside database
    const user=await Register.findOne({email})

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }

   //for password Match 
   const passwordMatch=await bcrypt.compare(password,user.password);
   
   if(!passwordMatch){
    return res.status(401).json({ message: 'Incorrect password' });
   }

   //using token
   const token=jwt.sign({email:user.email},secretKey,{expiresIn: '1h'})
   res.status(200).json({ message: 'Login successful', token });
})










router.post('/register',async(req,res)=>{
    const {firstname,lastname,email,password}=req.body;

if(!firstname || !lastname || !email || !password){
    return  res.status(400).json({ message: 'All fields are required' });
}
//check if email is valid or not
if(!validateEmail(email)){
    return res.status(400).json({ message: 'Invalid email format' });
}
if(!validPassword(password)){
    return res.status(404).json({message:'Password does not meet complexity requirements'})
}
const existingUser=await Register.findOne({email});
if (existingUser) {
    return res.status(409).json({ message: 'Email is already registered' });
  }
    // Hash the password before storing it in the database
  const hashedPassword=await bcrypt.hash(password,10)

  // creating new user database
   
  const newUser=new Register({firstname,lastname,email,password:hashedPassword});
try {
    await newUser.save() //saving the info

    //creating jwt token
    const token=jwt.sign({email:newUser.email},secretKey, { expiresIn: '1h' })
    res.status(201).json({ message: 'Registration successful', token });
} catch (error) {
    res.status(500).json({ message: 'Registration failed' });
}
})

module.exports=router;