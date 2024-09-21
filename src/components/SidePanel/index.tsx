import React from 'react';
import { Tabs, Tab } from '@mui/material';

const SidePanel = () => {
  return (
    <Tabs
      value={1}
      onChange={() => {}}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="chats"
      orientation="vertical"
    >
      <Tab label="John" />
      <Tab label="Nathan" />
      <Tab label="Sara" />
    </Tabs>
  );
};
export default SidePanel;
