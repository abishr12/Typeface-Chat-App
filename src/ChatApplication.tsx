import { SidePanel, ChatWindow } from './components';
import styles from './ChatApplication.module.css';

const ChatApplication = () => {
  return (
    <div className={styles.chatApp}>
      <SidePanel />
      <ChatWindow messages={[]} />
    </div>
  );
};

export default ChatApplication;
