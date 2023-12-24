const router = require("express").Router();
const restaurantContoller = require("../controllers/restaurantController");
const {
  verifyAndAuthorization,
  verifyVendor,
} = require("../middlewares/verifyToken");

router.get("/:code", restaurantContoller.getRandomRestaurant);
router.get("/byID/:id", restaurantContoller.getRestaurant);
router.post("/", verifyAndAuthorization, restaurantContoller.addRestaurant);
router.delete(
  "/:id",
  verifyVendor,
  verifyAndAuthorization,
  restaurantContoller.deleteRestaurant,
);
router.patch(
  "/:id",
  verifyVendor,
  verifyAndAuthorization,
  restaurantContoller.serviceAvailability,
);

module.exports = router;
