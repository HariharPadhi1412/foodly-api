const Restaurant = require("../models/Restaurant");

module.exports = {
  addRestaurant: async (req, res) => {
    const newRestaurant = new Restaurant(req.body);
    try {
      await newRestaurant.save();
      res
        .status(201)
        .json({ status: true, message: "Restaurant created Successfully" });
    } catch (error) {
      res.status(500).json({
        status: true,
        message: "Error creating restaurant" + "  " + error,
      });
    }
  },

  serviceAvailability: async (req, res) => {
    const restaurantID = req.params;

    try {
      const restaurant = await Restaurant.findById(restaurantID);

      if (!restaurant) {
        res.status(403).json({ status: true, message: "Restaurant Not Found" });
      }

      restaurant.isAvailable = !restaurant.isAvailable;
      await restaurant.save();
      res.status(200).json({
        status: true,
        message: "Availability Toggled Successfully",
        isAvailable: restaurant.isAvailable,
      });
    } catch (error) {
      res.status(500).json({
        status: true,
        message: "Error while toggling the is availabe service",
      });
    }
  },

  deleteRestaurant: async (req, res) => {
    const restaurantID = req.params;

    try {
      const restaurant = await Restaurant.findById(restaurantID);

      if (!restaurant) {
        res.status(403).json({ status: true, message: "Restaurant Not Found" });
      }

      await Restaurant.findByIdAndDelete(restaurantID);

      res
        .status(200)
        .json({ status: true, message: "Restaurant deleted successfully" });
    } catch (error) {
      res.status(500).json({
        status: true,
        message: "Error while deleting the restaurant ",
      });
    }
  },

  getRestaurant: async (req, res) => {
    const restaurantID = req.params;

    try {
      const restaturant = await Restaurant.findById(restaurantID);

      if (!restaturant) {
        res.status(404).json({ status: true, message: "Restaurant Not Found" });
      }

      res.status(200).json(restaturant);
    } catch (error) {
      res.status(500).json({
        status: true,
        message: "Error while retriving a restaurant",
      });
    }
  },

  getRandomRestaurant: async (req, res) => {
    try {
      let listRandomRestaurant = [];

      if (req.params.code) {
        listRandomRestaurant = await Restaurant.aggregate([
          { $match: { code: req.params.code } },
          {
            $sample: { size: 5 },
          },
          { $project: { __v: 0 } },
        ]);
      }

      if (!listRandomRestaurant.length) {
        listRandomRestaurant = await Restaurant.aggregate([
          {
            $sample: { size: 5 },
          },
          { $project: { __v: 0 } },
        ]);
      }

      if (listRandomRestaurant.length) {
        res.status(200).json(listRandomRestaurant);
      }
    } catch (error) {
      res.status(500).json({
        status: true,
        message: "Error while finding restaurant",
      });
    }
  },
};
