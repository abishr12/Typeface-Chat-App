import { SidePanel, ChatWindow } from './components';
import styles from './ChatApplication.module.css';
import React, { useState } from 'react';
import { Message, MessageList, User } from './data-access/types';

const messages: MessageList = {
  5349: [
    { id: 1, userId: 5349, text: 'Hello, Adham!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, John!', timestamp: 1634054161 },
  ],
  7241: [
    { id: 1, userId: 7241, text: 'Hello, Adham!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, Nathan!', timestamp: 1634054161 },
  ],
  4902: [
    { id: 1, userId: 4902, text: 'Hello, Adham!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, Sara!', timestamp: 1634054161 },
  ],
};
const ChatApplication = () => {
  const [chatMessages, setChatMessages] = useState(messages);

  const users = {
    0: { id: 0, name: 'Adham' },
    5349: { id: 5349, name: 'John' },
    7241: { id: 7241, name: 'Nathan' },
    4902: { id: 4902, name: 'Sara' },
  };

  const [chatUserId, setChatUserId] = useState(5349);

  // TODO: In ChatWindow, only send relevant user chat based off of the user id
  return (
    <div className={styles.chatApp}>
      <SidePanel
        users={users}
        chatUserId={chatUserId}
        setChatUserId={setChatUserId}
      />
      <ChatWindow
        messages={chatMessages[chatUserId]}
        users={users}
        chatUserId={chatUserId}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default ChatApplication;
