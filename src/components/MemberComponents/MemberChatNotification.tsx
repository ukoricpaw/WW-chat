import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { roomDataSelectorById } from '../../store/selectors/roomSelectors';
import MemberItem from './MemberItem';
import { Link } from 'react-router-dom';
import { userSelector } from '../../store/selectors/userSelectors';

interface MemberChatNotificationIProps {
  roomId: number;
}

const MemberChatNotification: FC<MemberChatNotificationIProps> = ({ roomId }) => {
  const roomData = useAppSelector(state => roomDataSelectorById(state, roomId));
  const userData = useAppSelector(userSelector);
  if (!roomData || !roomData.lastMessage) {
    return <></>;
  }

  return (
    <Link
      to={`${process.env.REACT_APP_CLIENT_URL}/chat/${
        roomData.roomType === 'dialog' ? roomData.userInfo?.email : roomData.roomId
      }`}
    >
      {roomData.roomType === 'dialog' ? (
        <MemberItem
          avatar={roomData.userInfo?.avatar as null | string}
          name={roomData.userInfo?.email as string}
          textVal={
            roomData.userInfo?.isTyping
              ? 'печатает...'
              : /* eslint-disable indent */
              roomData.lastMessage
              ? roomData.lastMessage.user.id === userData.id
                ? `Вы: ${roomData.lastMessage.text}`
                : roomData.lastMessage.text
              : ''
            /* eslint-enable indent */
          }
        />
      ) : (
        <MemberItem
          avatar={roomData.groupInfo?.avatar as null | string}
          name={roomData.groupInfo?.name as string}
          textVal={roomData.lastMessage ? roomData.lastMessage.text : ''}
        />
      )}
    </Link>
  );
};

export default MemberChatNotification;
