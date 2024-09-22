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

const SELF_USER_ID = 0;
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
  // Convert timestamps to human-readable format

  const convertDate = (timestamp: number) => {
    const date = new Date(timestamp);
    // Get month, day, and time in the desired format
    const month = date.toLocaleString('default', { month: 'short' }); // Full month name (e.g., "September")
    const day = date.getDate(); // Day of the month
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${month} ${day}, ${time}`;
  };

  // Believe the user would prefer to send messages with the enter key
  return (
    <div className={styles.chatWindow}>
      <Box className={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.userId === SELF_USER_ID
                ? styles.userMessage
                : styles.chatMessage
            }
          >
            <div className={styles.messageContainer}>
              <span className={styles.messageText}>{message.text}</span>
              <span
                className={
                  message.userId === SELF_USER_ID
                    ? styles.userMessageTime
                    : styles.chatMessageTime
                }
              >
                {convertDate(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </Box>
      <div className={styles.textBox}>
        <TextField
          id="outlined-multiline-static"
          label="Chat Here"
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
