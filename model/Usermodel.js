const { Schema, model } = require("mongoose");

const UserSchema=new Schema({
    name :{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    cpassword:{
        type:String,
        required:true,
        trim:true
    },
    role_id:{
        type:String,
        default:1,
        enum:["0","1","2"]
    }
})
const User=model("User",UserSchema)
module.exports=User