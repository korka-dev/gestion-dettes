import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ClientList from './components/ClientList';
import AddClient from './components/AddClient';
import AddDebt from './components/AddDebt';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/add-debt/:clientId" element={<AddDebt />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;