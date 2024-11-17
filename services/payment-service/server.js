const express = require('express');
const mongoose = require('mongoose');
const Payment = require('./models/paymentModel');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'  //frontend url allowed
}));
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Payment Service MongoDB connected!'))
.catch(err => console.log(err));

// Generate hash for PayU
function generateHash(data) {
  const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_MERCHANT_SALT}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

const PAYU_MERCHANT_KEY = "swTJBH";
const PAYU_MERCHANT_SALT = "w2PiWZuhEMmE33v74qp2G4EpcBEE7QGw";
const PAYU_PAYMENT_URL = "https://test.payu.in/_payment"; // Use production URL for live

// Create a payment
app.post('/payments', async (req, res) => {

  const { amount, productinfo, firstname, email, phone } = req.body;

    const txnid = `txn${Date.now()}`; // Generate a unique transaction ID
    const data = {
        key: PAYU_MERCHANT_KEY,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl: 'http://localhost:3000/payment-success', // Success URL
        furl: 'http://localhost:3000/payment-failure', // Failure URL
        service_provider: 'payu_paisa'
    };


    const hash = generateHash(data);
    res.json({ ...data, hash, action: PAYU_PAYMENT_URL });

  // const payment = new Payment(req.body);
  // await payment.save();
  // res.status(201).send(payment);
});

// Get payment by id
app.get('/payments/:id', async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  res.send(payment);
});

// TestId 6725375b3098781a5cf19f0d

app.listen(3006, () => console.log('Payment Service running on port 3006'));
