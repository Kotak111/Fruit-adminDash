const bcrypt=require("bcryptjs")
exports.comparepasswrod =async (inputpassword,hashpassword)=>{
    return await bcrypt.compare(inputpassword,hashpassword)
}