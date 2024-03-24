import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import './Styles/kahramaa.css';

const ChatWindow = ({ onClose }) => {
    const webChatContainerRef = useRef(null);
  
function scrollToBottom() {
    const chatContainer = webChatContainerRef.current;
    if (chatContainer) {
        // Scroll to the bottom of the container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}
useEffect(() => {
    const interval = setInterval(() => {
        scrollToBottom();
    }, 1000); 

    return () => clearInterval(interval);
}, []);

    return (
        <div className="chat-window">
            <ChatHeader onMinimize={onClose} />
            
            <div ref={webChatContainerRef} className="webchat-container" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
};

export default ChatWindow;
