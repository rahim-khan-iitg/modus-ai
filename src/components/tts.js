// components/TextToSpeechButton.js
import React from 'react';

const TextToSpeechButton = ({ text }) => {
  const handleClick = () => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  return <button onClick={handleClick}>Speak</button>;
};

export default TextToSpeechButton;
