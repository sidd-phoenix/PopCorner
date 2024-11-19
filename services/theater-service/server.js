const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Theater = require('./models/theaterModel');

const app = express();

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:3000'  // API gateway URL allowed
}));

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Theater Service MongoDB connected!'))
  .catch(err => console.log(err));

// Routes
// 1. Create a new theater
app.post('/theaters', async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).send(theater);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all theaters
app.get('/theaters', async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get a single theater by ID
app.get('/theaters/:id', async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (theater) {
      res.json(theater);
    } else {
      res.status(404).json({ error: "Theater not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update a theater by ID
app.put('/theaters/:id', async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (theater) {
      res.json(theater);
    } else {
      res.status(404).json({ error: "Theater not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Delete a theater by ID
app.delete('/theaters/:id', async (req, res) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (theater) {
      res.json({ message: "Theater deleted successfully" });
    } else {
      res.status(404).json({ error: "Theater not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. Get all theaters showing a specific movie
app.get('/theaters/movie/:movieId', async (req, res) => {
  try {
    const movieId = new mongoose.Types.ObjectId(req.params.movieId);
    const theaters = await Theater.find({ 'showtimes.movieId': movieId});    
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(3007, () => console.log('Theater Service running on port 3007'));
