import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from "./components/Map/Map";
import LandingPage from './components/pages/landing'; // Make sure this path is correct
import ChatWindow from './components/ChatWindow'; // Adjust the import path as necessary

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
    const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

    const toggleChatWindow = () => setIsChatWindowOpen(!isChatWindowOpen);

    return (
        <>
            <Map />
            <LandingPage onLogoClick={toggleChatWindow} />
            {isChatWindowOpen && <ChatWindow onClose={() => setIsChatWindowOpen(false)} />}
        </>
    );
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
