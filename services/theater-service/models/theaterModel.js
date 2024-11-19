const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    }
  },
  screens: [
    {
      screenNumber: { type: Number, required: true },
      type: { type: String, enum: ['Standard', 'IMAX', '4DX', 'VIP'], required: true },
      seatingCapacity: { type: Number, required: true },
    }
  ],
  showtimes: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
      screenNumber: { type: Number, required: true },
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
