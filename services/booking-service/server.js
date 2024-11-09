const express = require('express');
const mongoose = require('mongoose');
const Booking = require('./models/bookingModel');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Booking Service MongoDB connected!'))
.catch(err => console.log(err));

// Create a booking
app.post('/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.status(201).send(booking);
});

// Get booking by id
app.get('/bookings/:id', async (req, res) => {
  const snack = await Booking.findById(req.params.id);
  res.send(snack);
});

// TestId 672534463098781a5cf19f0c

app.listen(3003, () => console.log('Booking Service running on port 3003'));
