const express = require('express');
const mongoose = require('mongoose');
const Payment = require('./models/paymentModel');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Payment Service MongoDB connected!'))
.catch(err => console.log(err));

// Create a payment
app.post('/payments', async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).send(payment);
});

// Get payment by id
app.get('/payments/:id', async (req, res) => {
  const snack = await Payment.findById(req.params.id);
  res.send(snack);
});

// TestId 6725375b3098781a5cf19f0d

app.listen(3006, () => console.log('Payment Service running on port 3006'));
