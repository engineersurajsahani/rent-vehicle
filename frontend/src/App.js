import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookingForm from './components/BookingForm';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
          <Navbar />
            <Routes>
                <Route path="/" element={<BookingForm />} />
                <Route path="/ListBookings" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;

