import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/home';
import Detail from './pages/detail';
import Organize from './pages/organize';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <div className='containerContent'>
          <Navbar />
          <div className="hero" id="home" aria-label="home">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/organize" element={<Organize />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
