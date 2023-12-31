const User = require("../models/User");

module.exports = {
  getUser: async (req, res) => {
    const userID = req.user.id;

    try {
      const user = await User.findById(
        { _id: userID },
        { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      );

      res.status(200).json({ message: user, status: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: error + "user not found", status: false });
    }
  },

  deleteUser: async (req, res) => {
    const userID = req.user.id;

    try {
      await User.findByIdAndDelete(userID);

      res
        .status(200)
        .json({ message: "user deleted successfully", status: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: error + "user not found", status: false });
    }
  },

  updateUser: async (req, res) => {
    const userID = req.user.id;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userID,
        { $set: req.body },
        { new: true }
      );

      res
        .status(200)
        .json({ message: `${updatedUser} updated successfully`, status: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: error + "user not found", status: false });
    }
  },
};
