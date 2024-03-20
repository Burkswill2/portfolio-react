import React from 'react';
import { About, Footer, Header, Skills, Testimonial, Work } from './containers'
import { Navbar } from './components'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.scss'
import WeatherAppDemo from "./components/Pages/WeatherAppDemo";

const App = () => {

  return (
      <Router basename="/">
          <div className="app">
              <Navbar/>
              <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/testimonial" element={<Testimonial />} />
                  <Route path="/footer" element={<Footer />} />
                  <Route path="/" element={
                      <>
                          <Header/>
                          <About/>
                          <Work/>
                          <Skills/>
                          <Testimonial/>
                          <Footer/>
                      </>
                  }/>
                  <Route path="/WJB-Weather" element={<WeatherAppDemo/>}/>
              </Routes>
          </div>
      </Router>

  );
}

export default App;
