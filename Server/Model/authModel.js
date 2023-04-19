const mongoose = require("mongoose");

const db_link="mongodb+srv://honey59022:uNeIpsVadA4pnazp@cluster0.n6bd9wb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then((db) => {
    console.log("auth Database connected");
})
.catch((err) => {
    console.log("Error occured in connecting auth db", err.message);
})




const authSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"user"
    }
});


const authModel=new mongoose.model('authSchema',authSchema);

module.exports=authModel;