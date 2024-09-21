import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './index.module.css';
import { Message, UserList } from '../../data-access/types';

interface ChatWindowProps {
  messages: Message[];
  users: UserList;
}

// Todo: Timestamps
// Todo: Better looking font for text
// Todo: Enter functionality for sending messages
const ChatWindow = ({ messages, users }: ChatWindowProps) => {
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
        />
      </div>
    </div>
  );
};

export default ChatWindow;
