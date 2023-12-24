const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const restaturantRoute = require("./routes/restaurant");

dotenv.config();

const admin = require("firebase-admin");
const serviceAccount = require("./foodly-api-b1f12-firebase-adminsdk-utho8-9eb124c6c8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`db connected ${process.env.MONGO_URL}`))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/  ", restaturantRoute);
app.listen(process.env.PORT || port, () =>
  console.log(`listening on port number ${process.env.PORT}`),
);
