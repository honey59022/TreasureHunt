const authModel = require("../Model/authModel.js");
const userModel = require("../Model/userModel.js");




async function saveUserMatchStat(req,res){
    console.log("Saving Match Stat");
    try{
        const userName=req.body.userName;
        const gameStat=req.body.gameStat;
        
        const user=await authModel.findOne({userName});
            
        if(user && user.role=="user"){
            
            const user=await userModel.findOne({userName});
            if(user){
                user.gamesStat=[...user.gamesStat,gameStat];
                await user.save();
                console.log("data saved for user");
            }
            else{
                const gamesStat=[gameStat];
                const dataDoc=new userModel({userName,gamesStat});
                await dataDoc.save();
                console.log("data saved first time for user");
            }

            res.json({message:"stat saved"});
        }
        else{
            console.log("Access dennied",userName);
            res.json({message:"Access dennied"});
        }

    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Internal Server Error" })
    }

}

async function getAllUserMatchData(req,res){
    console.log("fetching Match Stat for all user");
    try{
        const userName=req.body.userName;
        const user=await authModel.findOne({userName});

        if(user && user.role=="admin"){

            const usersGameData=await userModel.find({});
    
            const arr=[];
            usersGameData.forEach(obj=> {
                const gamesStat=obj.gamesStat;
    
                let totalWon=0;
                const totalPlayed=gamesStat.length;
    
                gamesStat.forEach((obj)=>{
                    if(obj.isWon)totalWon++;
                })
    
                const percent=(totalWon/totalPlayed)*100;

                arr.push({userName:obj.userName,totalPlayed,totalWon,percent:percent.toFixed(1)});
            });

            
    
            res.json({data:arr,message:"Admin Logined"});
        }
        else{
            console.log("Access dennied");
            res.json({message:"Access dennied"});
        }

    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Internal Server Error" })
    }

}


module.exports={saveUserMatchStat,getAllUserMatchData};