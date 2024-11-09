const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model('Snack', snackSchema);
