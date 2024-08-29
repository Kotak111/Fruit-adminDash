const router=require("express").Router();
const FruitController = require("../Controller/FruitControlller");
const { verifyUser } = require("../midleware/auth");
const upload=require("../midleware/fileUpload")
router.post("/",verifyUser,upload.single("fruit_image"),FruitController.create)
module.exports=router;