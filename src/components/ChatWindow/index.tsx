import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './index.module.css';
import { Message } from '../../data-access/types';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className={styles.chatWindow}>
      <Box className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.sender}>{message.sender}</span>
            <span className={styles.messageText}>{message.text}</span>
          </div>
        ))}
      </Box>
      <TextField
        id="outlined-multiline-static"
        label="Chat"
        placeholder="Default Value"
        variant="outlined"
        className={styles.chatTextField}
      />
    </div>
  );
};

export default ChatWindow;
