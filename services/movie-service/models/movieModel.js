const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  duration: Number,
  img_url: String,
  releaseDate: Date
});

module.exports = mongoose.model('Movie', movieSchema);
