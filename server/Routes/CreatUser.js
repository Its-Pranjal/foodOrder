const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "your_jwt_secret"; 

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      location: req.body.location
    });

    const data = {
      user: {
        id: newUser.id
      }
    };

    const authToken = jwt.sign(data, jwtSecret);

    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error);
    res.json({ success });
  }
});

module.exports = router;
