const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    time: { type: String, required: true },
    imageUrl: { type: String, required: true },
    foods: { type: Array },
    pickup: { type: Boolean, required: false, default: true },
    delivery: { type: Boolean, required: false, default: true },
    owner: { type: String, required: true },
    isAvailable: { type: Boolean, required: false, default: true },
    code: { type: String, required: true },
    logoURL: {
      type: String,
      required: true,
      default:
        "https://media.istockphoto.com/id/1181218567/photo/close-up-top-view-of-young-people-putting-their-hands-together-indian-friends-with-stack-of.jpg?s=2048x2048&w=is&k=20&c=p_rtPy46oLQZRKvYfRpS2cwgMZhFIex0MGwq4ihWizQ=",
    },
    rating: { type: Number, min: 1, max: 5, required: false },
    ratingCount: {
      type: String,
    },
    coords: {
      id: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      longitudeDelta: { type: Number, required: true },
      latitudeDelta: { type: Number, required: true },
      address: { type: String, required: true },
      title: { type: String, required: false },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
