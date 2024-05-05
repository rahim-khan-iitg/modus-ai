// components/ChatMessage.js
'use client';
import React from 'react';
import { UserIcon } from '@heroicons/react/outline';
const ChatMessage = ({ username, message }) => {
  
  return (
    <div className="flex mb-4">
      <div className="flex-shrink-0 mr-2">
        <UserIcon className="h-6 w-6 text-gray-500" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{username}</span>
        <p className="bg-gray-200 rounded-lg p-2">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
