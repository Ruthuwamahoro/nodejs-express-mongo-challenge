const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
