const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json({status:200, message: "Successfully retrieved products", data: products})
});

router.get('/:id', async (req, res) => {
  const singleProduct = await Product.findById(req.params.id);
  if(singleProduct === null) res.status(400).json({status: 400, error: "id not found"})
  res.json({status:200, message: "Successfully retrieved product", data: singleProduct}) 
});

router.post('/', async (req, res) => {
  const {name , description, price} = await req.body
  const products = new Product({
    name,
    description,
    price
  })
  await products.save();
  res.json({status: 200, message: "Successfully posted products", data: null})
});

router.put('/:id', async (req, res) => {
  const newData = req.body
  const updateProduct = await Product.findByIdAndUpdate(req.params.id, newData, {new: true});
  if(updateProduct === null) res.status(400).json({status: 400, error: "id not found"})
  res.status(200).json({status: "ok",data: updateProduct, message: "Successfully retrieved updated"});
});

router.delete('/:id', async (req, res) => {
  const getId = req.params.id
  const result = await Product.findByIdAndDelete(getId);
  if(result === null) res.status(410).json({message: "product already deleted"})
  res.json({status: "ok", data: null , message:"successfully deleted products"});
});

module.exports = router;