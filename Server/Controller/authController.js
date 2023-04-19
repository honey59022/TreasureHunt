const authModel = require("../Model/authModel.js");
const jwt = require('jsonwebtoken');

const JWT_KEY = "jnv74@$^93877y98129rg3nkjdcsnj@#488787hbhfb^*6787hnjkw3nkjdcsnj@#4886";




async function loginUser(req, res) {
    console.log("Login User");
    
    try {
        if(!req.cookies.isLoggedIn){
            const userName = req.body.userName;
            const password = req.body.password;
    
            const filter = { userName };
    
    
            const user = await authModel.findOne(filter);
    
            if (user) {
    
                try {
    
                    if (user.password == password) {
                        const uniqueId = user['_id'];
                        const jwToken = jwt.sign({ payload: uniqueId }, JWT_KEY); //default algo is used
    
                        // res.cookie('isLoggedIn', jwToken, {  maxAge: (24 * 60 * 60 * 1000) });
                        
                        console.log("User Logined");
                        res.json({message:(user.role=="user")?"User Logined":"Admin Logined",name:user.name,jwToken:jwToken});
                    }
                    else res.json({ message: "Please enter a valid credentials" });
    
                }
                catch (err) {
                    console.log(err.message);
                    res.json({ message: "Internal Server Error" });
                }
    
    
            }
            else {
                res.json({ message: "Please enter a valid credentials" });
            }
        }
        else{
            console.log("User Already Loggined");
            res.json({message:"User Already Loggined"});
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Internal Server Error" })
    }


}

async function signupUser(req, res) {
    console.log("Signup user");
    try {
        const userName = req.body.userName;
        const email = req.body.email;
        const filter1 = { userName };
        const filter2 = { email };


        const user1 = await authModel.findOne(filter1);
        const user2 = await authModel.findOne(filter2);


        if (user1 || user2) {
            if (user1) {
                console.log("Username already exist");
                res.json({ message: "Username already exist" });
            }
            else {
                console.log("email already exist");
                res.json({ message: "email already exist" });
            }
        }
        else {
            const user = new authModel(req.body);
            await user.save();

            console.log("User SignedUp");
            res.json({data:user,message:"User signedUp"});
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Internal Server Error" })
    }

}

function logoutUser(req, res) {
    console.log("logout User");
    if (req.cookies != null && req.cookies.isLoggedIn) {
        res.cookie('isLoggedIn', '', { maxAge: 1 });
        console.log("user logged out successfully");
        res.json({message:'user logged out successfully'});   
        // res.redirect("/auth/login");
    }
    else {
        console.log("Please Login first");
        res.json({ message: 'Please Login first' });
    }
}




async function protectRoute(req, res, next) {
    try {
        
        if (req.body.jwToken) {
            const jwToken = req.body.jwToken;
            try {
                const payload = jwt.verify(jwToken, JWT_KEY);


                if (payload) {
                    next();
                }
                else {
                    res.json({ message: 'please login again' });
                }
            }
            catch (err) {
                res.json({ message: "please login again" });
            }

        }
        else {
            // browser
            const client = req.get('User-Agent');

            if (client.includes('Mozilla') == true) {
                res.json({ message: "please login again" });
            }
            else {
                // postman 
                res.json({ message: "please login again" });
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Internal Server Error" })
    }
}



module.exports={loginUser,signupUser,logoutUser,protectRoute};