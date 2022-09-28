import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './routes/Home';
import Events from './routes/Events';
import Event from './routes/Event';
import Salon from './routes/Salon';
import Salons from './routes/Salons';
import Chats from './routes/Chats';
import Chat from './routes/Chat';

import AuthProvider from './components/AuthProvider';
import Nav from './components/Nav'
import Sidebar from './components/Sidebar';

import './styles/styles.css';
import About from './routes/About';


function App() {

  
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <section id="page-wrapper">
          <Sidebar />
          <main id="main-content">
            <Routes>

              <Route exact path="/" element={<Home />} />
              <Route exact path="/ProjetZ" element={<Home />} />

              <Route exact path="/chats" element={<Chats />} />
              <Route exact path="/chats/official/:id" element={<Chat />} />
              <Route exact path="/chats/community/:id" element={<Chat />} />
              <Route exact path="/chats/private/:id" element={<Chat />} />

              <Route exact path="/events" element={<Events />} />
              <Route exact path="/events/:id" element={<Event />} />

              <Route exact path="/salons" element={<Salons />} />
              <Route exact path="/salons/:ref" element={<Salon />} />

              <Route exact path="/about" element={<About />} />
              
            </Routes>
          </main>
        </section>
      </AuthProvider>
    </Router>
  );
}

export default App;
