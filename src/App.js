import React, { useState } from 'react';
import axios from 'axios'; // Importa o módulo axios
import './App.css'; // Importando o arquivo CSS

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const API_KEY = ''; // Utilizando a API_KEY fornecida

  const searchMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      setMovies(response.data.Search);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={searchMovies}>Search</button>
      
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item" onClick={() => fetchMovieDetails(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.Title}</h2>
          <p>Plot: {selectedMovie.Plot}</p>
          <p>Director: {selectedMovie.Director}</p>
          <p>Actors: {selectedMovie.Actors}</p>
          <p>Released: {selectedMovie.Released}</p>
          <button onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
