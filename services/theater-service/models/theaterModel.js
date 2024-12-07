const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  movies: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
      screenNumber: { type: String, required: true },
      times: [
        {
          time: { type: String, required: true }, // e.g., '10:25 AM'
          price: { type: Number, required: true }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Theater', theaterSchema);
