import React, { useState, useEffect } from 'react';
import ChatMessage from '@/components/chatMessage';
import Dictaphone from '@/components/mic';

const ChatApp = () => {
  const initialMessages = [
    { username: 'AI', message: 'Hi! How can I help you?' }
  ];

  const [messages, setMessages] = useState([...initialMessages]);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  // const [res1, setRes1] = useState('');
  const getOllamaResponse = async (message) => {
    setIsProcessing(true);
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setIsProcessing(false);
    return data.message;
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  }

  const addMessage = (message, username) => {
    const newMessage = {
      username: username,
      message: message,
    };
    setMessages([...messages, newMessage]);
    setTranscript(message);
  }
  if (transcript !== '') {
    getOllamaResponse(transcript).then((response1) => {
      const newMessage1 = {
        username: 'AI',
        message: response1,
      };
      speak(response1);
      if (!isProcessing) { // Check if processing is complete
        setMessages([...messages, newMessage1]);
      }
    });
    
    setTranscript('');
  }
  

return (
  <div className="flex h-screen">
    <div className="flex-1 bg-gray-200 p-4">
      <Dictaphone onTextRecognized={(text, user) => addMessage(text, user)} />
    </div>
    <div className="flex-1 bg-white p-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} username={msg.username} message={msg.message} />
      ))}
    </div>
  </div>
);
};

export default ChatApp;
