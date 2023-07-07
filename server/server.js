const express = require('express');
const connectDB = require('./Db');
const cors = require('cors');
const signup = require("./Routes/CreatUser")
const login = require("./Routes/ValidateUser");
const displayData = require("./Routes/DisplayData");
const orderData = require("./Routes/OrderData");
const myOrderData = require("./Routes/MyOrderData");
const getuser = require("./Routes/GetUser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', signup);
app.use('/api', login);
app.use('/api', displayData);
app.use('/api', orderData);
app.use('/api', myOrderData);
app.use('/api',getuser);

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
