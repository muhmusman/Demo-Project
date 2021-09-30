const express = require("express");
const router = new express.Router();

const CartStore = require('../models/cart');
const ProductsStore = require("../models/products");

router.post("/addToCart", async(req,res) => {
    try {
        const addProductsToCart = new CartStore(req.body);
        let insertProductsToCart = await addProductsToCart.save();
        res.status(201).send(insertProductsToCart);
    } catch (error) {
      console.log('error');
      res.status(400).send(error);
    }
})

router.get("/cart", async(req,res) => {
    try {
        await CartStore.aggregate([
            {
              "$project": {
                "p_id": {
                  "$toObjectId": "$p_id"
                }
              }
            },
            {
              $lookup: {
                from: 'productstores',
                localField: 'p_id',
                foreignField: '_id',
                as: "product_store"
              }
            },
            {
                $unwind: "$product_store",
            },
          ])
            .then((result) => {
              res.json(result);
            })
            .catch((error) => {
              console.log(error);
            });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;