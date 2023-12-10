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
};
