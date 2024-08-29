const { Schema, model } = require("mongoose");

const FruitSchema = new Schema({
    fruit_name:{
        type:String,
        required:true,
        trim:true
    },
    fruit_price:{
        type:Number,
        required:true,
        trim:true
    },
    fruit_desc:{
        type:String,
        required:true,
        trim:true
    },
    fruit_image:{
        type:String,
        required:true,
    }
})
const Fruit=model("Fruit",FruitSchema)
module.exports=Fruit;