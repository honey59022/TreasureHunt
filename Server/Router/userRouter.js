const express=require("express");
const{saveUserMatchStat,getAllUserMatchData}=require("../Controller/userController");

const userRouter=express.Router();




userRouter
.route("/saveStat")
.post(saveUserMatchStat)

userRouter
.route("/getAllUserStat")
.post(getAllUserMatchData)


module.exports=userRouter;