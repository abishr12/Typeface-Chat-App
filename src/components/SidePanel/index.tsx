import React from 'react';
import { Tabs, Tab, Button, TextField } from '@mui/material';
import { UserList } from '../../data-access/types';
import styles from './index.module.css';

interface SidePanelProps {
  users: UserList;
  chatUserId: number;
  setChatUserId: (userId: number) => void;
  handleAddChat: (newChatName: string) => void;
}

// Todo: Delete chat
const SidePanel = ({
  users,
  chatUserId,
  setChatUserId,
  handleAddChat,
}: SidePanelProps) => {
  const userValues = Object.values(users).filter(
    (entry) => entry.name !== 'Adham',
  );

  const [openAddChatTextField, setOpenAddChatTextField] = React.useState(false);
  const [newChatName, setNewChatName] = React.useState('');

  return (
    <div className={styles.sidePanel}>
      <Button onClick={() => setOpenAddChatTextField(true)}>Add Chat</Button>
      <Tabs
        value={userValues.findIndex((user) => user.id === chatUserId)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="chats"
        orientation="vertical"
      >
        {userValues.map((user) => (
          <Tab
            key={user.id}
            label={user.name}
            onClick={() => {
              setChatUserId(user.id);
              setOpenAddChatTextField(false);
            }}
          />
        ))}
      </Tabs>
      {openAddChatTextField && (
        <div className={styles.textField}>
          <TextField
            type="text"
            placeholder="Enter user name"
            onChange={(e) => setNewChatName(e.target.value)}
            className={styles.addChatTextField}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddChat(newChatName);
                setOpenAddChatTextField(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
export default SidePanel;
