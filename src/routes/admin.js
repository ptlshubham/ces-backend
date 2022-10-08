const express = require("express");
const router = express.Router();
const db = require("../db/db");
const multer = require('multer');
const path = require('path');
const config = require("../../config");
var midway = require('./midway');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const nodemailer = require('nodemailer');
var handlebars = require("handlebars");
const fs = require('fs');
const schedule = require('node-schedule');



router.post("/SaveWebNavbar", (req, res, next) => {
    console.log(req.body)
    db.executeSql("INSERT INTO `web_navbar`(`email`, `contact`, `name`, `color`, `isactive`, `createddate`) VALUES ('" + req.body.email + "','" + req.body.contact + "','" + req.body.name + "','" + req.body.color + "','" + req.body.isactive + "',CURRENT_TIMESTAMP)", function (data, err) {
        if (err) {
            console.log(err);

        } else {

            return res.json('SUCESS');
        }
    });
});
router.post("/GetWebNavbar", (req, res, next) => {
    console.log("jkjjssjkdcsdckds")
    db.executeSql("select * from web_navbar;", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})
router.post("/SaveWebFooter", (req, res, next) => {
    console.log(req.body)
    db.executeSql("INSERT INTO `web_footer`(`phone`, `email`, `address`, `links`, `isactive`, `createddate`) VALUES ('" + req.body.phone + "','" + req.body.email + "','" + req.body.address + "','" + req.body.links + "','" + req.body.isactive + "',CURRENT_TIMESTAMP)", function (data, err) {
        if (err) {
            console.log(err);

        } else {

            return res.json('SUCESS');
        }
    });
});
router.post("/GetWebFooter", (req, res, next) => {
    console.log("jkjjssjkdcsdckds")
    db.executeSql("select * from web_footer;", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})


module.exports = router;