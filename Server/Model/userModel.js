const mongoose = require("mongoose");

const db_link="mongodb+srv://honey59022:uNeIpsVadA4pnazp@cluster0.n6bd9wb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then((db) => {
    console.log("user Database connected");
})
.catch((err) => {
    console.log("Error occured in connecting auth db", err.message);
})




const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    gamesStat: Array
});


const userModel=new mongoose.model('userSchema',userSchema);

module.exports=userModel;