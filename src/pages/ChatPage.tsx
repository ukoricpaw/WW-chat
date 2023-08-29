import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import ChatList from '../components/ChatComponents/ChatList';
import styles from '../styles/ChatAside.module.scss';
import SearchSection from '../components/ChatComponents/SearchSection';
import WebSocketLayout from '../components/GeneralComponents/WebSocketLayout';

const ChatPage: FC = () => {
  return (
    <WebSocketLayout>
      <div className={styles.ownPage__wrapper}>
        <section className={styles.chatlist__container}>
          <SearchSection />
          <ChatList />
        </section>
        <Outlet />
      </div>
    </WebSocketLayout>
  );
};

export default ChatPage;
