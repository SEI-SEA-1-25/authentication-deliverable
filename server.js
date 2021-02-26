const express = require("express");
const app = express();
const rowdy = require("rowdy-logger");
const cookieParser = require("cookie-parser");
const db = require("./models");
// const cryptojs = require("crypto-js");

// require("dotenv").config();

// const SECRET_STRING = process.env.SECRET_STRING;

// middleware
const rowdyRes = rowdy.begin(app);
app.use(express.static("public"));
app.use(require("morgan")("tiny"));
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(async (req, res, new) => {
//     const decryptedUserId = cryptojs.AES.decrypt(req.cookies.userId, SECRET_STRING);
//     const decryptedUserIdString = decryptedUserId.toString(cryptojs.enc.Utf8);
//     const user = await db.user.findByPk(decryptedUserIdString)
//     res.locals.user = user;
//     next();
// })

app.use(async (req, res, next) => {
    const user = await db.user.findByPk(req.cookies.userId)
    res.locals.user = user;
    next()
})

app.get("/", async (req, res) => {
    res.render("index")
});

app.use("/users", require("./controllers/usersController"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server started!");
    rowdyRes.print();
})