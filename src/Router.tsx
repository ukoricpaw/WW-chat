import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { useAppSelector } from './hooks/reduxHooks';
import ChatPage from './pages/ChatPage';
import SingleChat from './components/SingleChatComponents/SingleChat';

const Router: FC = () => {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/chat" element={<ChatPage />}>
            <Route path="/chat" element={<SingleChat />} />
            <Route path="/chat/:email" element={<SingleChat />} />
          </Route>
          <Route path="*" element={<Navigate to="/chat" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Auth />} />
          <Route path="/registration" element={<Auth />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
