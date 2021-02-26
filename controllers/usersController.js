require("dotenv").config();
const router = require("express").Router()
const db = require("../models");
const cryptoJS = require("crypto-js/aes");
const bcrypt = require("bcrypt")

const SECRET_STRING = process.env.SECRET_STRING;

router.get("/new", (req, res) => {
    res.render("users/new")
})

router.post("/", async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const user = await db.user.create({
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedUserId = cryptoJS.encrypt(
            user.id.toString(), SECRET_STRING)
        const encryptedUserIdString = encryptedUserId.toString()
            res.cookie("userId", encryptedUserIdString)
            res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

router.get("/login", (req, res) => {
    res.render("users/login")
})

router.post("/login", async (req, res) => {
    try {
      const user = await db.user.findOne({
        where: { email: req.body.email },
      });
      if (req.body.password === user.password) {
        const encryptedUserId = cryptoJS.encrypt(
          user.id.toString(),
          "super secret string"
        );
        const encryptedUserIdString = encryptedUserId.toString();
  
        res.cookie("userId", encryptedUserIdString);
        res.redirect("/");
      } else {
        res.render("users/login");
        console.log("Wrong password");
      }
    } catch (err) {
      console.log(err);
    }
  });

router.get("/logout", (req, res) => {
    res.clearCookie("userId")
    res.redirect("/")
})

// GET profile
router.get("/profile", (req, res) => {
    try {
      if (res.locals.user !== null) {
        res.render("users/profile");
      } else {
        res.redirect("/users/login");
      }
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;