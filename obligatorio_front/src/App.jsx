import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ActivityDetails from './Pages/ActivityDetails';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import Inscriptions from './Pages/Inscriptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/actividades/:id" element={<ActivityDetails />} />
        <Route path="/Inscriptions" element={<Inscriptions />} />
      </Routes>
    </Router>
  );
}

export default App;