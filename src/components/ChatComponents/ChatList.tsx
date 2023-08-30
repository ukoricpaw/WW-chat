import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { roomIsLoadingSelector, roomsIDsSelector } from '../../store/selectors/roomSelectors';
import MemberChatNotification from '../MemberComponents/MemberChatNotification';

const ChatList: FC = () => {
  const isLoading = useAppSelector(roomIsLoadingSelector);
  const roomsData = useAppSelector(roomsIDsSelector);

  if (isLoading || !roomsData) {
    return <></>;
  }

  return (
    <ul>
      {roomsData.map(room => (
        <MemberChatNotification key={room} roomId={room} />
      ))}
    </ul>
  );
};

export default ChatList;
