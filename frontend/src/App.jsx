// App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import 'react-day-picker/dist/style.css';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { SignedIn, useUser } from '@clerk/clerk-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import PhysicalRoom from './pages/hotelOwner/PhysicalRooms';
import ListRoom from './pages/hotelOwner/ListRoom';
import EditRoom from './pages/hotelOwner/EditRoom';
import MyProfile from './pages/MyProfile';
import WalkInBooking from './pages/hotelOwner/WalkInBooking';
import Testimonial from './components/Testimonial'; 
import FeedbacksPage from './pages/FeedbacksPage'; 
import AboutUs from './pages/AboutUs';
import History from './pages/hotelOwner/History';

// --- Global Modal ---
const Modal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner');

  const [modalMessage, setModalMessage] = useState(null);
  const showModal = useCallback((message) => setModalMessage(message), []);
  const closeModal = () => setModalMessage(null);

  const isAdmin = isLoaded && isSignedIn && user?.publicMetadata?.role === 'admin';

  // Redirect non-admins from /owner routes
  useEffect(() => {
    if (isOwnerPath && isLoaded) {
      if (!isAdmin) {
        navigate(isSignedIn ? '/' : '/sign-in');
      }
    }
  }, [isOwnerPath, isAdmin, isSignedIn, isLoaded, navigate]);

  return (
    <div>
      {!isOwnerPath && <Navbar />}

      <div className="min-h-[70vh]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/testimonials" element={<Testimonial showModal={showModal} />} />
          <Route path="/feedbacks" element={<FeedbacksPage showModal={showModal} />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Authenticated Routes */}
          <Route
            path="/my-bookings"
            element={isSignedIn ? <MyBookings /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/my-profile"
            element={isSignedIn ? <MyProfile /> : <Navigate to="/sign-in" />}
          />

          {/* Owner/Admin Routes */}
          <Route
            path="/owner/*"
            element={isLoaded && isAdmin ? <Layout /> : <Navigate to="/" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="physical-room" element={<PhysicalRoom />} />
            <Route path="list-room" element={<ListRoom />} />
            <Route path="edit-room/:id" element={<EditRoom />} />
            <Route path="walk-in-booking" element={<WalkInBooking />} />
            <Route path="history" element={<History />} />
          </Route>

          {/* Optional 404 page */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>

      <Footer />
      <Modal message={modalMessage} onClose={closeModal} />
    </div>
  );
};

export default App;
