const bcrypt=require("bcryptjs")
exports.hashpass = async (user_password,cpassword)=>{
        try {
            const sult=await bcrypt.genSalt(10)
            return await bcrypt.hash(user_password,sult)
            return await bcrypt.hash(cpassword,sult)
        } catch (error) {
            console.log(error);
        }
}