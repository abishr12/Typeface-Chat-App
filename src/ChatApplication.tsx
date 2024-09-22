import { SidePanel, ChatWindow } from './components';
import styles from './ChatApplication.module.css';
import React, { useState } from 'react';
import { MessageList, User, UserList } from './data-access/types';

const messages: MessageList = {
  5349: [
    { id: 1, userId: 5349, text: 'Hello, Adham!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, Sara!', timestamp: 1634054161 },
  ],
  4902: [
    { id: 1, userId: 4902, text: 'Hello, Adham!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, John!', timestamp: 1634054161 },
  ],
  7241: [
    { id: 1, userId: 7241, text: 'Hello, Adham!', timestamp: 1634054160 },
    { id: 2, userId: 0, text: 'Hello, Nathan!', timestamp: 1634054161 },
  ],
};
const users: UserList = {
  0: { id: 0, name: 'Adham' },
  4902: { id: 4902, name: 'John' },
  5349: { id: 5349, name: 'Sara' },
  7241: { id: 7241, name: 'Nathan' },
};

const ChatApplication = () => {
  const [chatMessages, setChatMessages] = useState(messages);
  const [chatUsers, setChatUsers] = useState(users);

  const [chatUserId, setChatUserId] = useState(4902);

  const handleAddChat = (newChatName: string) => {
    const newUserId = Math.floor(1000 + Math.random() * 9000);
    const newUser: User = { id: newUserId, name: newChatName };
    setChatUsers({ ...chatUsers, [newUserId]: newUser });
    setChatMessages({ ...chatMessages, [newUserId]: [] });
    setChatUserId(newUserId);
  };

  const handleDeleteChat = (userId: number) => {
    // set chatUserId to the first user in the chatUsers object that is not 0 (myself) and not the user being deleted
    setChatUserId(
      Number(
        Object.keys(chatUsers).find((id) => +id !== 0 && +id !== userId),
      ) ?? 0,
    );
    const newChatUsers = { ...chatUsers };
    delete newChatUsers[userId];
    setChatUsers(newChatUsers);

    const newChatMessages = { ...chatMessages };
    delete newChatMessages[userId];
    setChatMessages(newChatMessages);
  };

  return (
    <div className={styles.chatApp}>
      <SidePanel
        users={chatUsers}
        chatUserId={chatUserId}
        setChatUserId={setChatUserId}
        handleAddChat={handleAddChat}
        handleDeleteChat={handleDeleteChat}
      />
      <ChatWindow
        messages={chatMessages[chatUserId] ?? []}
        users={chatUsers}
        chatUserId={chatUserId}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default ChatApplication;
