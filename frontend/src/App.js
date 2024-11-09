import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel'
import Cards from './components/Cards'
import Footer from './components/Footer'
import CinemaCard from './components/CinemaCard';
import DateCarousel from './components/DateCarousel';
import MovieSlide from './components/MovieSlide';
import SeatLayout from './components/SeatLayout';
import TicketPopup from './components/TicketPopup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <>
          <header>
            <Navbar />
          </header>
          <main>
            <Carousel />
            {/* <Cards /> */}
            {/* <CinemaCard />
            <SeatLayout /> */}
          </main>
          <footer>
            <Footer />
          </footer>
          </>
        }
        />
        <Route path='/movies/:id' element={
          <>
          <header>
            <Navbar />
          </header>
          <main>
            <MovieSlide />
            <DateCarousel />
            <CinemaCard />
          </main>
          <footer>
            <Footer />
          </footer>
          </>
        } 
        />
        <Route path='/movies/:id/seatSelection' element={
          <>
          <header>
            <Navbar />
          </header>
          <main>
            <SeatLayout />
          </main>
          <footer>
            <Footer />
          </footer>
          </>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;