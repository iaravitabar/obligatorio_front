import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ActivityDetails from './Pages/ActivityDetails';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import CreateClass from './Pages/CreateClass';
import InscriptionForm from './Pages/InscriptionForm';
import Classes from './Pages/Classes';
import ModifyClasses from './Pages/ModifyClasses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/actividades/:id" element={<ActivityDetails />} />
        <Route path="/CrearClase" element={<CreateClass />} />
        <Route path="/inscripciones" element={<InscriptionForm />} />
        <Route path="/Clases" element={<Classes />} />
        <Route path="/ModificarClase" element={<ModifyClasses />} />
      </Routes>
    </Router>
  );
}

export default App;