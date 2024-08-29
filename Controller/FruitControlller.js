const Fruit = require("../model/FruitModel");

exports.create =async (req,res)=>{
    try {
        const {fruit_name,fruit_price,fruit_desc}=req.body;
        const fruit_image=req?.file?.filename;
        const data=await Fruit.create({
            fruit_name,
            fruit_price,
            fruit_desc,
            fruit_image
        })
        if(data){
            res.redirect("/view")
        }
    } catch (error) {
            console.log(error);
    }
}