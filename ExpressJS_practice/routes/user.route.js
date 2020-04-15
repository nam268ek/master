var express = require("express");
var controller = require('../controllers/user.controller')
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' })

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.userId);

router.post("/create", upload.single('fileUpload'), controller.postCreate);

module.exports = router;
