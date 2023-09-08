const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  date: Date,
});

const SaleModel = mongoose.model('Sale', saleSchema);
module.exports = SaleModel;