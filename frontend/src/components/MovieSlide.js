import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const MovieSlide = () => {
  const { id } = useParams(); // Extract the dynamic id from the URL
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null); // State to store fetched movie data
  const [error, setError] = useState(null); // State to handle errors

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const res = await axios.get(`http://localhost:3001/movies/${id}`);
      // console.log(res.data)
      setMovie(res.data); // Store the fetched movie data
    } catch (err) {
      setError("Failed to fetch movie data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : movie && <MovieCard movie={movie} />}
    </div>
  );
};

const MovieCard = ({ movie }) => {
  // Extract the year from releaseDate
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  return (
    <div className="card card-side m-2 shadow-xl">
            <img src={movie.img_url} alt={movie.title} /> {/* Movie poster */}
          <div className="card-body">
            <h2 className="card-title">{movie.title}</h2> {/* Movie title */}
            <p>{movie.description}</p> {/* Movie description */}
            <p>Genre: {movie.genre}</p> {/* Movie genre */}
            <p>Release Year: {releaseYear}</p> {/* Release year */}
          </div>
    </div>
  );
};

export default MovieSlide;
