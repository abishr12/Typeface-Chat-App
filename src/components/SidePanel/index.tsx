import React from 'react';
import { Tabs, Tab, Button, TextField } from '@mui/material';
import { UserList } from '../../data-access/types';
import styles from './index.module.css';
import { Close } from '@mui/icons-material';

interface SidePanelProps {
  users: UserList;
  chatUserId: number;
  setChatUserId: (userId: number) => void;
  handleAddChat: (newChatName: string) => void;
  handleDeleteChat: (userId: number) => void;
}

const SidePanel = ({
  users,
  chatUserId,
  setChatUserId,
  handleAddChat,
  handleDeleteChat,
}: SidePanelProps) => {
  const userValues = Object.values(users).filter(
    (entry) => entry.name !== 'Adham',
  );

  const [openAddChatTextField, setOpenAddChatTextField] = React.useState(false);
  const [newChatName, setNewChatName] = React.useState('');

  // Wanted close button to be available only on the selected chat
  // rather than cluttering up the side panel
  // Assuming that user would be more likely to delete the chat they are currently viewing

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
            icon={
              user.id === chatUserId ? (
                <Close
                  className={styles.closeIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(user.id);
                  }}
                  aria-label={`delete ${user.name} chat`}
                />
              ) : (
                <div className={styles.closeIcon} />
              )
            }
            iconPosition="end"
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
            label="add user chat"
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
