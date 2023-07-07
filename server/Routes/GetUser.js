const express = require('express');
const User = require('../models/User');
//const Order = require('../models/Orders');
const router = express.Router();
//const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const axios = require('axio');
const fetch = require('../middleware/fetchdetails');
//const jwtSecret = "HaHa";

router.post('/getuser', fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // -password will not pick password from db.
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});
module.exports = router;