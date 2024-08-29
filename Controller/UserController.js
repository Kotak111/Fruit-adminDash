const { comparepasswrod } = require("../helpers/Comparepassword");
const { hashpass } = require("../helpers/HashPass");
const User = require("../model/Usermodel");
const jwt=require("jsonwebtoken")
const crypto=require("crypto");
const sendData = require("../config/mail");
const bcrypt=require("bcryptjs")
const { ForgotFormat } = require("../utils/ForgotFormat");

exports.create =async (req,res)=>{
    try {
        const {name,email,password,cpassword}=req.body;
        const IsMmail =await User.findOne({email:email})
        if(IsMmail){
            res.json("Email Already Register😫😫")
        }
        const hashpas=await hashpass(password,cpassword)
        const data=await User.create({
            name,
            email,
            password:hashpas,
            cpassword:hashpas
        })
        if(data){
            req.flash('info',"signup Successfully! yeehh login now ...")
           res.redirect("/signin")
        }
    } catch (error) {
        console.log(error);
    }
}
exports.signin =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(email =="" || password ==""){
            req.flash('info',"please enter fileds!")
        }
        const ExitUser=await User.findOne({email:email})
        if(!ExitUser){
            // res.send("Email Id does Not exit🤣🤣🤣")
            req.flash('info',"not exist")
            res.redirect('/signin')
        }
        const Ismatch=await comparepasswrod(password,ExitUser.password)
        if(!Ismatch){
            req.flash('info',"password not match")
            res.send("password Not match")
        }
        const token =jwt.sign({
            userid:ExitUser._id,
            userrole:ExitUser.role_id
        },
        "yeskey",
        {expiresIn:"1h"}
         )
         res.cookie("token",token,{httpOnly:true})
         res.cookie("user",ExitUser,{httpOnly:true}).redirect("/")
         console.log(token);
    } catch (error) {
        console.log(error);
    }
}
exports.Forgot=async(req,res)=>{
   try {
    //  function generateOtp(length = 6) {
    //      const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
    //      return otp.padStart(length, "0");
    //  }
     const {email}=req.body;
     const Exit=await User.findOne({email:email})
     if(!Exit){
         res.json("User Not Found")
     }
    //  const otp=generateOtp();
     const link=`${process.env.WEBSITE_URL}/change/${email}`
     sendData(Exit.email,"Forget Your Password",ForgotFormat(Exit.email,link));
     return res.json("Your Forgot password link successfully send your mail")
   } catch (error) {
    console.log(error);
   }
}
exports.changepass = async (req,res)=>{
    try {
        console.log(req.body);
        const {email,password,cpassword}=req.body;
        const user=await User.findOne({email:email})
        if(!user){
            res.json("User not exists")
        }
        if(password !==cpassword){
            res.json("password not match")
        }
        const hashpassd= await bcrypt.hash(password,10)
        const update=await User.updateOne(
    
            {
                email:email
            },
            {
                password:hashpassd
            }
        )
        if(update){
            res.redirect("/signin")
            // res.json("update")
        }
    } catch (error) {
        console.log(error);
    }
}
exports.newpass= async(req,res)=>{
  try {
      const {email,password,newpass,cpassword}=req.body;
      const user=await User.findOne({email:email})
      const Ismatch=await comparepasswrod(newpass,password)
      if (!Ismatch) {
          return res.status(400).json({ message: "Current password not match 😫😫" });
      }
      if(newpass!==cpassword){
          res.json("password and reEnter not match!")
      }
      const has = await bcrypt.hash(newpass)
      const data=await User.updateOne(
          {
              email:email
          },
          {
              newpass:has
          }
      )
      if(data){
          res.json("password change ")
      }
  } catch (error) {
    console.log(error);
  }
}