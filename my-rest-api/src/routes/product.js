const express = require('express');
const User = require('../models/user');
const router = express.Router();
const Product = require('../models/product');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');


router.get('/', async (req, res) => {
  try{
    const { page=1, limit=5} = req.query;
    const products = await Product.find().limit(limit * 1).skip((page - 1) * limit).exec();
    const count = await Product.countDocuments();
    res.json({status:200, message: "Successfully retrieved products", data: products, totalPages: Math.ceil(count / limit), currentPage: page})
  } catch(error){
    res.json({status:500, message: "Unexpected error occurred", data: error.message})
  }
});

router.get('/:id', async (req, res) => {
  try{
    const singleProduct = await Product.findById(req.params.id);
    if(singleProduct === null) res.status(400).json({status: 400, error: "id not found"})
    res.json({status:200, message: "Successfully retrieved product", data: singleProduct})
  } catch(error){
    res.json({status:500, message: "Unexpected error occurred", data: error.message})
  }
});

router.post('/', async (req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    try{
      if(err){
        return next(err)
      }
      if(!user){
          return res.status(401).json({status: 401, error: "please login is required"})
      }
      const {name , description, price} = await req.body
      const products = new Product({
        name,
        description,
        price
      })
      await products.save();
      res.json({status: 200, message: "Successfully posted products", data: null})
    } catch(error){
      res.json({status:500, message: "Unexpected error occurred", data: error.message})
    }
  })(req,res,next)

});

router.put('/:id', async (req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    try{
      if(err){
        return next(err)
      }
      if(!user){
          return res.status(401).json({status: 401, error: "please login is required"})
      }
      const newData = req.body
      const updateProduct = await Product.findByIdAndUpdate(req.params.id, newData, {new: true});
      if(updateProduct === null) res.status(400).json({status: 400, error: "id not found"})
      res.status(200).json({status: "ok",data: updateProduct, message: "Successfully retrieved updated"});
    } catch(error){
      res.json({status:500, message: "Unexpected error occurred", data: error.message})
    }
  })(req,res,next)

});

router.delete('/:id', async (req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    try{
      if(err){
        return next(err)
      }
      if(!user){
          return res.status(401).json({status: 401, error: "please login is required"})
      }
      const getId = req.params.id
      const result = await Product.findByIdAndDelete(getId);
      if(result === null) res.status(410).json({message: "product already deleted"})
      res.json({status: "ok", data: null , message:"successfully deleted products"});
    } catch(error){
      res.json({status:500, message: "Unexpected error occurred", data: error.message})
    }
  })(req,res,next)

});



const jwtOptions= {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'Thisistokensecretkey'
}

passport.use(new Strategy(jwtOptions, async(jwtPayload, done)=>{
  try{
      const user = await User.findOne({email: jwtPayload.email});
      if(user){
          return done(null, user)
      } if(!user){
        return done(null, false)
      } else {
          return done(null, false)
      }
  } catch(err){
      return done(err)
  }
}))

module.exports = router;