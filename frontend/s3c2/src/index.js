import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from "./components/Map/Map";
import LandingPage from './components/pages/landing'; // Import LandingPage component


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Map />
    <LandingPage />
  </>
);
