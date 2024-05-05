// components/Dictaphone.js
'use client';
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MicrophoneIcon, XIcon, RefreshIcon } from '@heroicons/react/outline';

const Dictaphone = ({ onTextRecognized }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      SpeechRecognition.startListening();
    }
  }, []);

  const handleTextRecognized = () => {
    onTextRecognized(transcript, "You");
    resetTranscript();
  };


  if (transcript !== '' && listening === false) {
    handleTextRecognized();
    resetTranscript();
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div>Microphone: {listening ? 'on' : 'off'}</div>
      <button className="btn p-1 hover:bg-gray-400 hover:rounded-md" onClick={SpeechRecognition.startListening}>
        <MicrophoneIcon className="h-5 w-5 mr-2 inline-block " />
        Start
      </button>
      <button className="btn p-1 hover:bg-gray-400 hover:rounded-md" onClick={SpeechRecognition.stopListening}>
        <XIcon className="h-5 w-5 mr-2 inline-block" />
        Stop
      </button>
      <button className="btn p-1 hover:bg-gray-400 hover:rounded-md" onClick={resetTranscript}>
        <RefreshIcon className="h-5 w-5 mr-2 inline-block" />
        Reset
      </button>
      <input className="transcript mt-4 w-96" value={transcript} />
      {/* <button className="btn" onClick={handleTextRecognized}>
        Add as Message
      </button> */}
    </div>
  );
};

export default Dictaphone;
