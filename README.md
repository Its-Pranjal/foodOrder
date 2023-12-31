Application code structure documentation
This application is developed in two parts 
Fronted
Backend
The directory structure of the Fronted part

The development dependencies and tools used are react, react-bootstrap,react-dom,react-icon,react-router.
To start the fronted type npm start.

Src
    ↳components
	↳card.js
	↳Carousel.js
        ↳ ContextReducer.js
↳  Footer.js
↳  Navbar.js
   ↳screens
 	↳cart.js
↳Home.js
↳Login.js
↳signup.js
↳MyOrder.js

App.js: The `App.js` file is the main entry point of the client-side application. It sets up the routing using `react-router-dom` and wraps the components with the `CartProvider` context provider.

Components: The `Components` directory contains reusable React components that are used on multiple screens. Examples include the Navbar, Footer, and Card components.

Screens: The `Screens` directory contains React components that represent different screens or pages of the client-side application. The given code has components for the Home, Login, SignUp, and MyOrder screens.

Home.js displays the menu, including categories and individual dishes.

Login.js and Signup.js handle user authentication and registration.

 `MyOrder.js` displays the user's order history.

Cart.js manages the cart functionality, including adding/removing items and calculating totals.

The `ContextReducer.js` file defines the context provider component (`CartProvider`) and the corresponding reducer function. It manages the state related to the cart and provides it to the components using the context API.

The directory structure of the Backend part
Server
The development dependencies and tools used are react-express, node.js, mongoose, express-validator, JSON web token, bcrypt.

To start server type npm start

↳Middleware
	↳fetchdetails.js
↳Routes
	↳CreatUser
↳DisplayData
↳MyOrderData
↳OrderData
↳ValidateUser

↳Models
↳Orders.js
↳user.js
↳Db.js
↳server.js

server.js: The `server.js` file is the main entry point of the server-side application. It sets up the Express server, establishes the database connection, and defines the routes and middleware. It also listens for incoming requests and starts the server.

Routes: The `Routes` directory contains separate files for different routes of the application. Each file defines the routes and their corresponding handlers.

CreateUser

The `CreateUser` route handles the user signup functionality. It allows users to create an account by providing their name, location, email, and password.

 HTTP POST request with user signup data in the request body, including name, location, email, and password.

HTTP response with a success message if the user is successfully created. If there are any errors during the signup process, an error message is returned.

MyOrderData

 Purpose: The `MyOrderData` route handles retrieving the order history for a specific user. It fetches the orders associated with the user from the database and sends them to the frontend for display.

DisplayData

The `DisplayData` route handles the menu display functionality. It retrieves the menu data from the database and sends it to the frontend for display.

OrderData

The `OrderData` route handles the order placement functionality. It allows users to place an order by providing the selected dishes and their quantities.

ValidateUser

The `ValidateUser` route handles user login functionality. It validates the user's credentials and provides an authentication token if the credentials are correct.	  
Models: The `Models` directory contains the Mongoose models for interacting with the MongoDB database. The models define the schemas and provide methods for querying and manipulating data.

Db.js  The `Db.js` file sets up the connection to the MongoDB database using Mongoose. It establishes the connection and loads initial data from the collections (`food_items` and `foodCategory`) into global variables for easy access.

Middleware  The `Middleware` directory contains custom middleware functions that can be used in the route handlers. In the given code, the `fetchdetails` middleware is used to validate the JWT token and retrieve the user data from the token.
