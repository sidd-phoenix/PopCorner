const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('User Service MongoDB connected!'))
.catch(err => console.log(err));

// Create user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

//TestId 6725314d3098781a5cf19f09

app.listen(3002, () => console.log('User Service running on port 3002'));
