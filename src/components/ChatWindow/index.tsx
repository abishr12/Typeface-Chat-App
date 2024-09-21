import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './index.module.css';
import { Message, UserList } from '../../data-access/types';

interface ChatWindowProps {
  messages: Message[];
  users: UserList;
}

const ChatWindow = ({ messages, users }: ChatWindowProps) => {
  return (
    <div className={styles.chatWindow}>
      <Box className={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? styles.message : styles.userMessage}
          >
            <span className={styles.messageText}>{message.text}</span>
          </div>
        ))}
      </Box>
      <TextField
        id="outlined-multiline-static"
        label="Chat"
        placeholder="Chat Here"
        variant="outlined"
        className={styles.chatTextField}
      />
    </div>
  );
};

export default ChatWindow;
