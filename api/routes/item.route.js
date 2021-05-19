const express = require('express');
const { get } = require('http');
const app = express();
const itemRoute = express.Router();

// Item model
let Item = require('../models/Item');

// Add Item
itemRoute.route('/createItem').post((req, res, next) => {
  Item.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Items
itemRoute.route('/allItems').get((req, res) => {
  Item.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Item
itemRoute.route('/updateItem/:_id').put((req, res, next) => {
  Item.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Item
itemRoute.route('/deleteItem/:_id').delete((req, res, next) => {
  Item.findOneAndDelete({ _id: req.params._id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = itemRoute;
