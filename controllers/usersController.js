// const { Router } = require("express");
const router = require("express").Router()
const db = require("../models");
// const cryptojs = require("crypto-js");
// const bcrypt = require("bcrypt")

router.get("/new", (req, res) => {
    res.render("users/new")
})

router.get("/login", (req, res) => {
    res.render("users/login")
})

router.get("/logout", (req, res) => {
    res.clearCookie("userId")
    res.redirect("/")
})

module.exports = router;