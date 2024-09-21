import { SidePanel, ChatWindow } from './components';
import styles from './ChatApplication.module.css';
import React, { useState } from 'react';
import { Message, User } from './data-access/types';
import { time } from 'console';

const ChatApplication = () => {
  // Make this into an object with the user id as the key
  const messages: Message[] = [
    { id: 1, userId: 5349, text: 'Hello, Bob!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, Alice!', timestamp: 1634054161 },
  ];

  const users = {
    0: { name: 'Alice' },
    5349: { name: 'Bob' },
  };

  const [chatMessages, setChatMessages] = useState(messages);

  // TODO: In ChatWindow, only send relevant user chat based off of the user id
  return (
    <div className={styles.chatApp}>
      <SidePanel />
      <ChatWindow messages={chatMessages} users={users} />
    </div>
  );
};

export default ChatApplication;
