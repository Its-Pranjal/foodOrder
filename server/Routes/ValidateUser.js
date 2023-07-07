const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "your_jwt_secret";

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Please login with correct credentials" });
      }

      const isPasswordMatch = await bcrypt.compare(password, userData.password);

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ errors: "Please login with correct credentials" });
      }

      const payload = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(payload, jwtSecret);

      return res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
