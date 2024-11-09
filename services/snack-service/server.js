const express = require('express');
const mongoose = require('mongoose');
const Snack = require('./models/snackModel');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Snack Service MongoDB connected!'))
.catch(err => console.log(err));

//Create snack
app.post('/snacks', async (req, res) => {
  const snack = new Snack(req.body);
  await snack.save();
  res.status(201).send(snack);
});

//Get snack by id
app.get('/snacks/:id', async (req, res) => {
  const snack = await Snack.findById(req.params.id);
  res.send(snack);
});

// TestId 672537d63098781a5cf19f0e

app.listen(3005, () => console.log('Snack Service running on port 3005'));
