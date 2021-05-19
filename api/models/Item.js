const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
  name: {
    type: String
  },
  itype: {
    type: String
  },
  quantity:{
    type: Number
  },
  image: {
    type: String
  },
}, {
  collection: 'items'
})

module.exports = mongoose.model('Item', Item)
