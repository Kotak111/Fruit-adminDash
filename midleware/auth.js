const jwt=require("jsonwebtoken")
exports.verifyUser = (req,res,next)=>{
        try {
            const token= req.cookies.token;
            if(!token){
                res.send("Access denied ! unauthorized")
            }
            let verifyUser=jwt.verify(token,"yeskey")
            if(!verifyUser){
                    res.send("Unauthorized request !")
            }
            req.user=verifyUser;
            next();
        } catch (error) {
           res.json(error)
        }
}
