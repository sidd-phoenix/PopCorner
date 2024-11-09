const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/theaterModel');

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
// 1. Create a new movie
app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get a single movie by ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update a movie by ID
app.put('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (movie) {
      res.json({ message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Additional queries

// 6. Get movies by genre
app.get('/movies/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Get movies released after a specific year
app.get('/movies/after/:year', async (req, res) => {
  try {
    const movies = await Movie.find({ releaseYear: { $gt: req.params.year } });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Get movies with a rating above a specific score
app.get('/movies/rating/above/:score', async (req, res) => {
  try {
    const movies = await Movie.find({ rating: { $gt: req.params.score } });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Get a paginated list of movies
app.get('/movies/page/:page/limit/:limit', async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  const limit = parseInt(req.params.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const movies = await Movie.find().skip(skip).limit(limit);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Search movies by title (partial match)
app.get('/movies/search/:title', async (req, res) => {
  try {
    const regex = new RegExp(req.params.title, 'i'); // Case-insensitive search
    const movies = await Movie.find({ title: regex });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3007, () => console.log('Theater Service running on port 3007'));
