import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { UserList } from '../../data-access/types';

interface SidePanelProps {
  users: UserList;
  chatUserId: number;
  setChatUserId: (userId: number) => void;
}

// Todo: Delete chat
const SidePanel = ({ users, chatUserId, setChatUserId }: SidePanelProps) => {
  const userValues = Object.values(users).filter(
    (entry) => entry.name !== 'Adham',
  );
  return (
    <Tabs
      value={userValues.findIndex((user) => user.id === chatUserId)}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="chats"
      orientation="vertical"
    >
      {userValues.map((user, index) => (
        <Tab
          key={user.id}
          label={user.name}
          onClick={() => {
            setChatUserId(user.id);
          }}
        />
      ))}
    </Tabs>
  );
};
export default SidePanel;
