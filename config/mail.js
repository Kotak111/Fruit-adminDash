const nodemailer=require("nodemailer")


const Transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"kotakh311@gmail.com",
        pass:"casv enss rkeh viaw"
    }
})


async function sendData(to,subject,html,otp){
    const format ={
        from:"kotakh311@gmail.com",
        to:to,
        subject:subject,
        html:html,otp
    }
    await Transporter.sendMail(format,(info,err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("send mail");
        }
    })
}
module.exports=sendData