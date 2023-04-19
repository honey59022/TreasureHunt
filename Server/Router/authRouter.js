const express=require("express");
const{loginUser,signupUser,logoutUser}=require('../Controller/authController')

const authRouter=express.Router();


authRouter
.route('/login')
.post(loginUser)


authRouter
.route('/signup')
.post(signupUser)


// authRouter
// .route('/logout')
// .get(logoutUser)


module.exports=authRouter;