const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: Array, required: true },
    phone: { type: String, required: false },
    userType: {
      type: String,
      required: true,
      default: "Client",
      enum: ["Admin", "Driver", "Client", "Vendor"],
    },
    profile: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2022/10/14/03/04/astronaut-7520334_1280.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
