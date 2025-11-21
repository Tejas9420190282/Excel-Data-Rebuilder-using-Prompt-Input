
// excel_Router.js

const express = require("express");
const multer = require("multer");
const { excel_Controller } = require("../controller/excel_Controller");

const excel_Router = express.Router();

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

excel_Router.post("/process-excel", upload.single("file"), excel_Controller);

exports.excel_Router = excel_Router;

