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
import UserProfile from './components/UserProfile';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div className='App'>
          <header>
            <Navbar />
          </header>
          <main>
            <Carousel />
            <Cards />
          </main>
          <footer>
            <Footer />
          </footer>
          </div>
        }
        />
        <Route path='/movies/:id' element={
          <div className='App'>
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
          </div>
        } 
        />
        <Route path='/movies/:id/seatSelection' element={
          <div className='App'>
          <header>
            <Navbar />
          </header>
          <main>
            <SeatLayout />
          </main>
          <footer>
            <Footer />
          </footer>
          </div>
        }
        />
        <Route path='/profile' element={
          <div className='App'>
          <header>
            <Navbar />
          </header>
          <main>
            <UserProfile />
          </main>
          <footer>
            <Footer />
          </footer>
          </div>
        }
        />
        <Route path='/payment-failure' element={<PaymentFailure />}/>
        <Route path='/payment-success' element={<PaymentSuccess />}/>
      </Routes>
    </Router>
  );
}

export default App;