const express = require("express");
const userRouter = require("./Router/userRouter");
const authRouter = require("./Router/authRouter");
const cookieParser = require('cookie-parser');
const { protectRoute } = require("./Controller/authController");
const cors = require('cors');



const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin: true,
  credentials: true
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('access-control-expose-headers: Set-Cookie');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.get('/', (req, res) => res.redirect('/user'));
app.use("/auth", authRouter);
app.use("/user", protectRoute, userRouter);


app.listen(port, (err) => {
    if (err) console.log(err.message);
    else console.log(`Server is listening at port ${port}`);
})
