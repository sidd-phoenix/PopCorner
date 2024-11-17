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
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
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
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update `updatedAt` on document update
theaterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Theater', theaterSchema);
