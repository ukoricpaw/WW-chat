import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { roomDataSelectorById } from '../../store/selectors/roomSelectors';
import MemberItem from './MemberItem';

interface MemberChatNotificationIProps {
  roomId: number;
}

const MemberChatNotification: FC<MemberChatNotificationIProps> = ({ roomId }) => {
  const roomData = useAppSelector(state => roomDataSelectorById(state, roomId));

  if (!roomData) {
    return <></>;
  }

  return (
    <>
      {roomData.roomType === 'dialog' ? (
        <MemberItem
          avatar={roomData.userInfo?.avatar as null | string}
          name={roomData.userInfo?.email as string}
          textVal={roomData.lastMessage.text}
        />
      ) : (
        <MemberItem
          avatar={roomData.groupInfo?.avatar as null | string}
          name={roomData.groupInfo?.name as string}
          textVal={roomData.lastMessage.text}
        />
      )}
    </>
  );
};

export default MemberChatNotification;
