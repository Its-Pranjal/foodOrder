const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  const data = req.body.order_data;
  data.splice(0, 0, { Order_date: req.body.order_date });
  console.log("1231242343242354", req.body.email);

  try {
    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error: " + error.message);
  }
});

module.exports = router;
