const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://pranjalchaurasiya8574:66VOGJ3DFAHDxVQj@restaurant-app.zsq0lli.mongodb.net/restaurant?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    console.log('Database connected successfully!');

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    const foodItemsCollection = db.collection('food_items');
    const foodCategoryCollection = db.collection('foodCategory');

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategory;

     } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
