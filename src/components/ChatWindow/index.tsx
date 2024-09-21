import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './index.module.css';
import { Message, MessageList, UserList } from '../../data-access/types';

interface ChatWindowProps {
  messages: Message[];
  users: UserList;
  chatUserId: number;
  setChatMessages: React.Dispatch<React.SetStateAction<MessageList>>;
}

// Todo: Timestamps
// Todo: Enter functionality for sending messages
const ChatWindow = ({
  messages,
  setChatMessages,
  chatUserId,
}: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Trigger submit logic
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setChatMessages((prevMessages: MessageList) => {
      const newMessage: Message = {
        id: prevMessages[chatUserId]?.length ?? 0,
        text: inputValue,
        userId: 0,
        timestamp: Date.now(),
      };
      return {
        ...prevMessages,
        [chatUserId]: [...(prevMessages[chatUserId] ?? []), newMessage],
      };
    });

    setInputValue('');
  };
  return (
    <div className={styles.chatWindow}>
      <Box className={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.userId === 0 ? styles.userMessage : styles.chatMessage
            }
          >
            <span className={styles.messageText}>{message.text}</span>
          </div>
        ))}
      </Box>
      <div className={styles.textBox}>
        <TextField
          id="outlined-multiline-static"
          label="Chat"
          placeholder="Chat Here"
          variant="outlined"
          className={styles.chatTextField}
          onKeyDown={handleKeyPress}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
