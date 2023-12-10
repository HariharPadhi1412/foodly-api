const router = require("express").Router();
const authContoller = require("../controllers/authController");

router.post("/register", authContoller.createUser);
router.post("/login", authContoller.loginUser);

module.exports = router;
