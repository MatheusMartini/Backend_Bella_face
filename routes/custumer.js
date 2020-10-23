const express = require("express");
const router = express.Router();
const { response } = require("express");

const custumerController = require("../controllers/custumerController");

// add custumer
router.post("/cadastro", custumerController.createUser)

router.post("/login", custumerController.verificationUser);

module.exports = router;