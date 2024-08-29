const { default: mongoose } = require("mongoose");

exports.db = mongoose.connect(`mongodb://localhost:27017/Practice`).then(()=>{
    console.log("database connected😉😉");
})
.catch((err)=>{
    console.log("database not connected😫😫");
})