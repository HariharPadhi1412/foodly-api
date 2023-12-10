const router = require("express").Router();
const userContoller = require("../controllers/userController");
const { verifyAndAuthorization } = require("../middlewares/verifyToken");

router.get("/", verifyAndAuthorization, userContoller.getUser);
router.delete("/", verifyAndAuthorization, userContoller.deleteUser);
router.put("/", verifyAndAuthorization, userContoller.updateUser);

module.exports = router;
