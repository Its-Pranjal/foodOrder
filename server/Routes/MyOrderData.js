const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/myOrderData', async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

module.exports = router;
