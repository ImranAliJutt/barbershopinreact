import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route  , Navigate } from 'react-router-dom';

import Navbar from './navbar';
import Map from './Map';
import PricesReviews from './PricesReviews';
import GalleryReviews from './GalleryReviews';
import Location from './Location';
import TeamMembers from './TeamMembers';
import BookAppointment from './BookAppointment';
import Footer from './Footer';
import HeroSection from './HeroSection';
import AdminDashboard from './AdminDashboard';
import LoginPage from './LoginPage';
function App() {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  return (
    <Router>
      <div className="App">
        {/* Navbar and other components that should be available on every page */}
        
        
        {/* Define routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HeroSection />
                <Map />
                <PricesReviews />
                <GalleryReviews />
                <BookAppointment />
                <TeamMembers />
                <Location />
                <Footer />
              </>
            } 
          />
          {/* Other individual routes if needed */}
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/map" element={<Map />} />
          <Route path="/gallery" element={<GalleryReviews />} />
          <Route path="/location" element={<Location />} />
          <Route path="/team" element={<TeamMembers />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
