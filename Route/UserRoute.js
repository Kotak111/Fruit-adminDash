const router=require("express").Router();
const UserController=require("../Controller/UserController");
const { verifyUser } = require("../midleware/auth");
router.post("/register",UserController.create)
router.post("/login",UserController.signin)
router.post("/forgot",UserController.Forgot)
router.post("/change",UserController.changepass)
router.post("/newpass",UserController.newpass)


module.exports=router;