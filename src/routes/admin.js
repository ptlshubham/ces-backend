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

router.post("/SaveWebImageUpload", (req, res, next) => {
    db.executeSql("INSERT INTO web_home_image(`name`, `position`, `image`, `isactive`, `createddate`) VALUES ('" + req.body.name + "','" + req.body.position + "','" + req.body.image + "'," + req.body.isactive + ",CURRENT_TIMESTAMP)", function (data, err) {
        if (err) {
            console.log(err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/GetWebImageUpload", (req, res, next) => {
    db.executeSql("select * from web_home_image where name='" + req.body.name + "'", function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})

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
router.post("/SaveWebSliderImage", (req, res, next) => {

    var imgname = generateUUID();

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/slider');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {

            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        console.log("path=", config.url + 'images/slider/' + req.file.filename);

        if (req.fileValidationError) {
            console.log("err1", req.fileValidationError);
            return res.json("err1", req.fileValidationError);
        } else if (!req.file) {
            console.log('Please select an image to upload');
            return res.json('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            console.log("err3");
            return res.json("err3", err);
        } else if (err) {
            console.log("err4");
            return res.json("err4", err);
        }
        return res.json('/images/slider/' + req.file.filename);


    });
});
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}


module.exports = router;