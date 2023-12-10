const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is invalid", status: false });
      }

      req.user = user;
      next();
    });
  }
};

const verifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Driver" ||
      req.user.userType === "Admin" ||
      req.user.userType === "Vendor"
    ) {
      next();
    } else {
      res.status(403).json({ status: false, message: "UserType is invalid" });
    }
  });
};

const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin" || req.user.userType === "Vendor") {
      next();
    } else {
      res.status(403).json({
        status: false,
        message: "UserType isn't of type Vendor ",
      });
    }
  });
};

const verifyDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin" || req.user.userType === "Driver") {
      next();
    } else {
      res.status(403).json({
        status: false,
        message: "UserType isn't of type Driver ",
      });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      next();
    } else {
      res.status(403).json({
        status: false,
        message: "UserType isn't of type Admin ",
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyAndAuthorization,
  verifyAdmin,
  verifyDriver,
  verifyVendor,
};
