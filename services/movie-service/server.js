const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/movieModel');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'  //api-gateway url allowed
}));

app.use(express.json());

mongoose.connect('mongodb+srv://phoenix:Aadil%402016@cluster0.k2jq7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Movie Service MongoDB connected!'))
.catch(err => console.log(err));

app.post('/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).send(movie);
});

app.get('/movies',async (req,res)=>{
  let movies=await Movie.find({});
  return res.json(movies);
})

app.listen(3004, () => console.log('Movie Service running on port 3004'));