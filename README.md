# node-express-mongo-api-guide

A comprehensive guide to developing REST APIs using Node.js, Express.js, and MongoDB. This guide will walk you through the process step-by-step, providing clear instructions and challenges to solidify your understanding.

**1. Project Setup**

  * Create a new project directory:
    ```bash
    mkdir my-rest-api
    cd my-rest-api
    ```
  * Initialize a new npm project:
    ```bash
    npm init -y
    ```
  * Install dependencies:
    ```bash
    npm install express mongoose dotenv
    ```
      * `express`: For building the web server and API.
      * `mongoose`: For interacting with MongoDB.
      * `dotenv`: For loading environment variables.

**2. MongoDB Setup**

  * If you don't have MongoDB installed, download and install it from the official website: [https://www.mongodb.com/](https://www.google.com/url?sa=E&source=gmail&q=https://www.mongodb.com/)
  * Start the MongoDB server: `mongod`
  * Create a new database (e.g., `my-api-db`) using the MongoDB shell: `mongo`

**3. Project Structure**

Organize your project with the following structure:

```
my-rest-api/
├── src/
│   ├── models/
│   │   └── product.js
│   ├── routes/
│   │   └── products.js
│   ├── app.js
│   └── config/
│       └── db.js
├── .env
└── index.js

```

**4. Code Implementation**

  * **`.env`:** Store your MongoDB connection string and other sensitive information:
    ```
    MONGODB_URI=mongodb://localhost:27017/my-api-db
    ```
  * **`src/config/db.js`:** Connect to MongoDB using Mongoose:
    ```javascript
    const mongoose = require('mongoose');
    require('dotenv').config();

    const connectDB = async () => {
      try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
      } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
      }
    };

    module.exports = connectDB;
    ```
  * **`src/models/product.js`:** Define a Mongoose schema for your data (e.g., products):
    ```javascript
    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
    });

    module.exports = mongoose.model('Product', productSchema);
    ```
  * **`src/routes/products.js`:** Create API routes using Express.js:
    ```javascript
    const express = require('express');
    const router = express.Router();
    const Product = require('../models/product');

    // GET /products - Retrieve all products
    router.get('/', async (req, res) => {
      // ... (Implementation to fetch products)
    });

    // GET /products/:id - Retrieve a specific product
    router.get('/:id', async (req, res) => {
      // ... (Implementation to fetch a product by ID)
    });

    // POST /products - Create a new product
    router.post('/', async (req, res) => {
      // ... (Implementation to create a product)
    });

    // PUT /products/:id - Update a product
    router.put('/:id', async (req, res) => {
      // ... (Implementation to update a product)
    });

    // DELETE /products/:id - Delete a product
    router.delete('/:id', async (req, res) => {
      // ... (Implementation to delete a product)
    });

    module.exports = router;
    ```
  * **`src/app.js`:** Set up the Express.js application:
    ```javascript
    const express = require('express');
    const connectDB = require('./config/db');
    const productRoutes = require('./routes/products');

    const app = express();
    const port = process.env.PORT || 3000;

    // Connect to MongoDB
    connectDB();

    // Middleware
    app.use(express.json());

    // Routes
    app.use('/products', productRoutes);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    ```
  * **`index.js`:** Main entry point for the application:
    ```javascript
    require('./src/app');
    ```

**5. Challenges**

  * Implement the logic for each API endpoint in `products.js`.
  * Add error handling and input validation to your routes.
  * Implement pagination for the `/products` endpoint to handle large datasets.
  * Add authentication and authorization to protect your API [Optional].
  * Deploy your API to a free cloud platform of your choice[Optional].

This guide provides a solid foundation for building REST APIs with Node.js, Express.js, and MongoDB. 

Happy coding\!
